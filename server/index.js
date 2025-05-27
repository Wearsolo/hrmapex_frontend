const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const pool = require('./config/db');
const nodemailer = require('nodemailer');

const app = express();

app.use(cors());
app.use(express.json());
app.use(fileUpload({
    createParentPath: true,
    limits: {
        fileSize: 10 * 1024 * 1024
    }
}));

// Serve uploaded files statically
app.use('/uploads', express.static('uploads'));

// Configure nodemailer
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'mamm0n715120@gmail.com',
        pass: 'yhuy hzoj lplk ncuy'
    }
});

// Function to send email notification
const sendEmailNotification = async (newsData) => {
    try {
        // Build image HTML if attachment exists and is an image
        let imageHtml = '';
        if (newsData.attachment) {
            const imageExtensions = ['.png', '.jpg', '.jpeg', '.gif'];
            const fileExt = newsData.attachment.toLowerCase().split('.').pop();
            if (imageExtensions.includes('.' + fileExt)) {
                imageHtml = `
                    <div style="margin: 20px 0;">
                        <img src="http://localhost:3001/uploads/${newsData.attachment}" 
                             alt="News Image" 
                             style="max-width: 100%; 
                                    border-radius: 8px; 
                                    box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                    </div>`;
            }
        }

        const mailOptions = {
            from: 'mamm0n715120@gmail.com',
            to: 'nuania715120@gmail.com',
            subject: `📢 ข่าวสารใหม่มาแล้ว: ${newsData.title}`,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #eee; padding: 20px; border-radius: 10px; background-color: #f9f9f9;">
                    <h2 style="color: #4F46E5;">${newsData.title}</h2>
                    <p style="font-size: 16px; color: #555;">
                        มีข่าวสารใหม่จาก <strong style="color: #000;">หมวดหมู่: ${newsData.category}</strong> ที่คุณไม่ควรพลาด!
                    </p>
                    <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
                    ${imageHtml}
                    <p style="font-size: 15px; color: #333;">${newsData.content}</p>
                    <div style="text-align: center; margin: 30px 0;">
                        <a href="http://localhost:5173/news/${newsData.newsId}" 
                           style="background-color: #4F46E5; color: white; padding: 12px 24px; 
                                  text-decoration: none; border-radius: 5px; font-weight: bold;
                                  display: inline-block;">
                            คลิกเพื่อดูข่าวเพิ่มเติม
                        </a>
                    </div>
                    <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
                    <p style="font-size: 13px; color: #888;">
                        ✉️ ข้อความนี้จัดส่งโดยระบบ HR Management System<br/>
                        กรุณาอย่าตอบกลับอีเมลฉบับนี้
                    </p>
                </div>
            `
        };

        await transporter.sendMail(mailOptions);
        console.log('Email notification sent successfully');
    } catch (error) {
        console.error('Error sending email notification:', error);
    }
};

// Error handler middleware
const errorHandler = (err, req, res, next) => {
    console.error('Error:', err);
    res.status(500).json({ 
        error: 'Internal server error',
        message: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
};

// Login authentication endpoint
app.post('/api/auth/login', async (req, res, next) => {
    try {
        const { email, password } = req.body;

        // Hardcode สำหรับ admin@gmail.com / 123456
        if (email === 'admin@gmail.com' && password === '123456') {
            res.json({
                success: true,
                user: {
                    email: 'admin@gmail.com',
                    role: 'admin',
                    name: 'Admin'
                }
            });
            return;
        }

        // ...ถ้าต้องการเช็ค database ต่อ ให้ใส่โค้ดเดิมตรงนี้...

        res.status(401).json({
            success: false,
            message: 'Invalid email or password'
        });
    } catch (error) {
        next(error);
    }
});

// Route to get all employees
app.get('/api/employees', async (req, res, next) => {
    try {        const result = await pool.query(`
            SELECT 
                "EmployeeId", "FName", "LName", "Nickname", "Email",
                "Department", "Position", "Type", "Status", "username",
                "ImageUrl", "MobileNumber"
            FROM employees 
            ORDER BY "EmployeeId" DESC
        `);
        res.json(result.rows);
    } catch (error) {
        console.error('Error fetching employees:', error);
        res.status(500).json({ 
            error: 'Failed to fetch employees',
            details: error.message 
        });
    }
});

// Route to get employee by ID
app.get('/api/employees/:id', async (req, res, next) => {
    try {        const result = await pool.query(`
            SELECT 
                "EmployeeId", "FName", "LName", "Nickname", "Email", "Department", 
                "Position", "StartDate", "Type", "Status", "ImageUrl",
                "MobileNumber", "DateOfBirth", "MaritalStatus", "Gender",
                "Nationality", "Address", "City", "State", "ZIPCode",
                "BankName", "AccountHolderName", "AccountNumber", "AccountType",
                "BankCode", "BankStatus", "BankLastUpdated", "Salary", "Age",
                "SlackID", "SkypeID", "GithubID"
            FROM employees 
            WHERE "EmployeeId" = $1
        `, [req.params.id]);
          if (result.rows.length > 0) {
            // Format null values as '-'
            const employee = Object.fromEntries(
                Object.entries(result.rows[0]).map(([key, value]) => [key, value ?? '-'])
            );
            res.json(employee);
        } else {
            res.status(404).json({ error: 'Employee not found' });
        }
    } catch (error) {
        next(error);
    }
});

// Route to add new employee
app.post('/api/employees', async (req, res, next) => {
    try {
        const { 
            firstName, lastName, nickname, age, email, 
            phone, dob, gender, maritalStatus, nationality,
            address, city, state, zipCode, department,
            position, type, status, startDate, salary,
            bankName, accountHolderName, accountNumber,
            accountType, bankCode, bankStatus,
            slackId, skypeId, githubId,
            profileImage
        } = req.body;
        
        // Generate employee ID - format: EMPYYYYMM#### (random 4 digits)
        const date = new Date();
        const yearMonth = date.getFullYear().toString() + (date.getMonth() + 1).toString().padStart(2, '0');
        const randomDigits = Math.floor(Math.random() * 9000 + 1000);
        const employeeId = `EMP${yearMonth}${randomDigits}`;
        
        // Insert into employees table
        const result = await pool.query(
            `INSERT INTO employees (
                "EmployeeId", "FName", "LName", "Nickname", "Age",
                "DateOfBirth", "MaritalStatus", "Gender", "Nationality",
                "Address", "City", "State", "ZIPCode", "Email", "MobileNumber",
                "Department", "Position", "Type", "Status", "StartDate",
                "ImageUrl"
            ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21)
            RETURNING *`,
            [
                employeeId, firstName, lastName, nickname, age,
                dob, maritalStatus, gender, nationality,
                address, city, state, zipCode, email, phone,
                department, position, type, status, startDate,
                profileImage
            ]
        );
        
        // If bank details are provided, store them in a separate table or update accordingly
        if (bankName && accountNumber) {
            await pool.query(
                `UPDATE employees SET 
                    "BankName" = $1,
                    "AccountHolderName" = $2,
                    "AccountNumber" = $3,
                    "AccountType" = $4,
                    "BankCode" = $5,
                    "BankStatus" = $6,
                    "BankLastUpdated" = NOW()
                WHERE "EmployeeId" = $7`,
                [bankName, accountHolderName, accountNumber, accountType, bankCode, bankStatus, employeeId]
            );
        }

        // Store account IDs if provided
        if (slackId || skypeId || githubId) {
            await pool.query(
                `UPDATE employees SET 
                    "SlackID" = $1,
                    "SkypeID" = $2,
                    "GithubID" = $3
                WHERE "EmployeeId" = $4`,
                [slackId || null, skypeId || null, githubId || null, employeeId]
            );
        }
        
        res.status(201).json({ 
            message: 'Employee added successfully',
            employeeId: employeeId
        });
    } catch (error) {
        next(error);
    }
});

// Route to delete employee
app.delete('/api/employees/:id', async (req, res, next) => {    try {
        const result = await pool.query('DELETE FROM employees WHERE "EmployeeId" = $1', [req.params.id]);
        if (result.rowCount > 0) {
            res.json({ message: 'Employee deleted successfully' });
        } else {
            res.status(404).json({ error: 'Employee not found' });
        }
    } catch (error) {
        next(error);
    }
});

// Route to update employee
app.put('/api/employees/:id', async (req, res, next) => {
    try {
        const employeeId = req.params.id;
        const {
            FName, LName, MobileNumber, Age, DateOfBirth,
            MaritalStatus, Gender, Nationality, Address, City,
            State, ZIPCode, Department, Position, Status,
            Type, Salary, BankName, AccountHolderName,
            AccountNumber, AccountType, BankCode, BankStatus,
            Email, SlackID, SkypeID, GithubID
        } = req.body;        const result = await pool.query(
            `UPDATE employees 
             SET "FName"=$1, "LName"=$2, "MobileNumber"=$3, "Age"=$4, "DateOfBirth"=$5,
                 "MaritalStatus"=$6, "Gender"=$7, "Nationality"=$8, "Address"=$9, "City"=$10,
                 "State"=$11, "ZIPCode"=$12, "Department"=$13, "Position"=$14, "Status"=$15,
                 "Type"=$16, "Salary"=$17, "BankName"=$18, "AccountHolderName"=$19,
                 "AccountNumber"=$20, "AccountType"=$21, "BankCode"=$22, "BankStatus"=$23,
                 "Email"=$24, "SlackID"=$25, "SkypeID"=$26, "GithubID"=$27
             WHERE "EmployeeId"=$28`,
            [FName, LName, MobileNumber, Age, DateOfBirth,
             MaritalStatus, Gender, Nationality, Address, City,
             State, ZIPCode, Department, Position, Status,
             Type, Salary, BankName, AccountHolderName,
             AccountNumber, AccountType, BankCode, BankStatus,
             Email, SlackID, SkypeID, GithubID, employeeId]
        );
          if (result.rowCount > 0) {
            res.json({ message: 'Employee updated successfully' });
        } else {
            res.status(404).json({ error: 'Employee not found' });
        }
    } catch (error) {
        console.error('Error updating employee:', error);
        next(error);
    }
});

// Route to get attendance by employee ID
app.get('/api/attendance/:id', async (req, res, next) => {
    try {        const result = await pool.query(
            'SELECT * FROM attendance WHERE "EmployeeId" = $1 ORDER BY "Date" DESC',
            [req.params.id]
        );
        res.json(result.rows);
    } catch (error) {
        next(error);
    }
});

// Route to get leave data by employee ID
app.get('/api/leave/:id', async (req, res, next) => {
    try {        const result = await pool.query(
            'SELECT "StartDate", "EndDate", "Reason", "Status" FROM leavetable WHERE "EmployeeId" = $1 ORDER BY "StartDate" DESC',
            [req.params.id]
        );
        res.json(result.rows);
    } catch (error) {
        next(error);
    }
});

// Route to get projects by employee ID
app.get('/api/projects/:id', async (req, res, next) => {    try {
        const result = await pool.query(
            'SELECT "ProjectName", "StartDate", "EndDate", "Status" FROM project WHERE "EmployeeId" = $1 ORDER BY "StartDate" DESC',
            [req.params.id]
        );
        res.json(result.rows);
    } catch (error) {
        next(error);
    }
});

// Route to get total counts for dashboard
app.get('/api/dashboard/counts', async (req, res, next) => {
    try {
        const employeeCount = await pool.query('SELECT COUNT(*) as count FROM employees');
        const totalEmployees = employeeCount.rows[0].count;
        
        // Get total leaves count
        const leavesCount = await pool.query('SELECT COUNT(*) as count FROM leaves');
        const totalLeaves = leavesCount.rows[0].count;
        
        // Get total disbursement amount
        const disbursementTotal = await pool.query('SELECT COALESCE(SUM("Amount"), 0) as total FROM disbursements');
        const totalDisbursement = disbursementTotal.rows[0].total;
        
        // Get previous month's counts for percentage changes
        const lastMonth = new Date();
        lastMonth.setMonth(lastMonth.getMonth() - 1);
        const lastMonthStr = lastMonth.toISOString().split('T')[0].substring(0, 7); // YYYY-MM
          const lastMonthLeaves = await pool.query(
            'SELECT COUNT(*) as count FROM leaves WHERE TO_CHAR("StartDate", \'YYYY-MM\') = $1',
            [lastMonthStr]
        );
        const lastMonthLeavesCount = lastMonthLeaves.rows[0].count;
          const lastMonthDisbursement = await pool.query(
            'SELECT COALESCE(SUM("Amount"), 0) as total FROM disbursements WHERE TO_CHAR("DisbursementDate", \'YYYY-MM\') = $1',
            [lastMonthStr]
        );
        const lastMonthDisbursementTotal = lastMonthDisbursement.rows[0].total;

        // Calculate percentage changes
        const leavesChange = lastMonthLeaves.count === 0 ? '+0%' : 
            `${((leavesCount.count - lastMonthLeaves.count) / lastMonthLeaves.count * 100).toFixed(0)}%`;
        
        const disbursementChange = lastMonthDisbursement.total === 0 ? '+0%' : 
            `${((disbursementTotal.total - lastMonthDisbursement.total) / lastMonthDisbursement.total * 100).toFixed(0)}%`;
          res.json({
            totalEmployees: totalEmployees || 0,
            totalDisbursement: totalDisbursement || 0,
            totalLeaves: totalLeaves || 0,
            employeeChange: '+4%', // Hardcoded for now, can be made dynamic later
            applicantChange: '-2%', // Hardcoded for now, can be made dynamic later
            disbursementChange: lastMonthLeavesCount === 0 ? '+0%' : 
                `${((totalLeaves - lastMonthLeavesCount) / lastMonthLeavesCount * 100).toFixed(0)}%`,
            leavesChange: lastMonthDisbursementTotal === 0 ? '+0%' : 
                `${((totalDisbursement - lastMonthDisbursementTotal) / lastMonthDisbursementTotal * 100).toFixed(0)}%`
        });
    } catch (error) {
        next(error);
    }
});

// Route to get all news
app.get('/api/news', async (req, res, next) => {
    try {
        const result = await pool.query(`
            SELECT 
                "newsId",
                "title",
                "content",
                "category",
                "attachment",
                "created_at",
                "isPinned",
                "isVisible"
            FROM news 
            ORDER BY "isPinned" DESC, "created_at" DESC
        `);
        
        // Map the results and format the dates
        const news = result.rows.map(item => ({
            ...item,
            created_at: new Date(item.created_at).toISOString()
        }));
        
        res.json(news);
    } catch (error) {
        console.error('Error fetching news:', error);
        next(error);
    }
});

// Route to create new news
app.post('/api/news', async (req, res, next) => {
    try {
        const { title, content, category } = req.body;
        let attachment = null;

        // Handle file upload if there is one
        if (req.files && req.files.attachment) {
            const file = req.files.attachment;
            const timestamp = Date.now();
            const fileName = `${timestamp}-${file.name}`;
            
            // Move file to uploads directory
            await file.mv(`uploads/${fileName}`);
            attachment = fileName;
        }

        // Insert into database
        const result = await pool.query(`
            INSERT INTO news ("title", "content", "category", "attachment", "created_at", "isPinned", "isVisible")
            VALUES ($1, $2, $3, $4, NOW(), false, true)
            RETURNING *
        `, [title, content, category, attachment]);

        const newsData = result.rows[0];
        
        // Send email notification
        await sendEmailNotification(newsData);
        
        res.status(201).json({
            success: true,
            news: newsData
        });
    } catch (error) {
        console.error('Error creating news:', error);
        next(error);
    }
});

// Route to get a single news item
app.get('/api/news/:id', async (req, res, next) => {
    try {
        const result = await pool.query('SELECT * FROM news WHERE "NewsId" = $1', [req.params.id]);
        if (result.rows.length > 0) {
            res.json(result.rows[0]);
        } else {
            res.status(404).json({ error: 'News not found' });
        }
    } catch (error) {
        next(error);
    }
});

// Route to update news
app.put('/api/news/:id', async (req, res, next) => {
    try {
        const { title, category, content } = req.body;
        let attachment = null;

        // Check if there's a file attachment
        if (req.files && req.files.attachment) {
            const file = req.files.attachment;
            const fileName = `${Date.now()}-${file.name}`;
            
            // Move the file to uploads directory
            await file.mv(`./uploads/${fileName}`);
            attachment = fileName;
        }        // Build the SQL query based on whether there's an attachment
        let sql = `UPDATE news SET "Title" = $1, "Category" = $2, "Content" = $3`;
        let params = [title, category, content];

        if (attachment) {
            sql += `, "Attachment" = $${params.length + 1}`;
            params.push(attachment);
        }

        sql += ` WHERE "NewsId" = $${params.length + 1}`;
        params.push(req.params.id);

        const result = await pool.query(sql, params);
          if (result.rowCount > 0) {
            res.json({ message: 'News updated successfully' });
        } else {
            res.status(404).json({ error: 'News not found' });
        }
    } catch (error) {
        console.error('Error updating news:', error);
        next(error);
    }
});

// Route to delete news
app.delete('/api/news/:id', async (req, res, next) => {
    try {        const result = await pool.query('DELETE FROM news WHERE "NewsId" = $1', [req.params.id]);
        if (result.rowCount > 0) {
            res.json({ message: 'News deleted successfully' });
        } else {
            res.status(404).json({ error: 'News not found' });
        }
    } catch (error) {
        next(error);
    }
});

// Toggle pin status for a news item
app.put('/api/news/:id/toggle-pin', async (req, res) => {
  try {
    const { id } = req.params;
    const { isPinned } = req.body;
    
    // Validate input
    if (typeof isPinned !== 'number' || ![0, 1].includes(isPinned)) {
      return res.status(400).json({ error: 'isPinned must be 0 or 1' });
    }    const result = await pool.query(
      'UPDATE news SET "isPinned" = $1 WHERE "NewsId" = $2',
      [isPinned, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'News not found' });
    }

    // Return the new state in the response
    res.json({ 
      success: true,
      message: 'Pin status updated successfully',
      isPinned: isPinned
    });
  } catch (error) {
    console.error('Error updating pin status:', error);
    res.status(500).json({ 
      error: 'Failed to update pin status',
      message: error.message 
    });
  }
});

// Toggle visibility status for a news item
app.put('/api/news/:id/toggle-visibility', async (req, res) => {
    try {
      const { id } = req.params;
      const { Hidenews } = req.body;
        const result = await pool.query(
        'UPDATE news SET "Hidenews" = $1 WHERE "NewsId" = $2',
        [Hidenews, id]
      );
  
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'News not found' });
      }
  
      res.json({ message: 'Visibility status updated successfully' });
    } catch (error) {
      console.error('Error updating visibility status:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

// Send reject notification email
app.post('/api/disbursement/reject-notification', async (req, res) => {
  try {
    const { employeeName, category, amount, rejectReason, employeeEmail } = req.body;

    const mailOptions = {
      from: 'mamm0n715120@gmail.com',
      to: 'nuania715120@gmail.com',
      subject: 'การเบิกจ่ายของคุณถูกปฏิเสธ',
      html: `
        <div style="font-family: 'Prompt', sans-serif; padding: 20px; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #ef4444;">การเบิกจ่ายถูกปฏิเสธ</h2>
          <p>เรียน คุณ${employeeName}</p>
          <p>การเบิกจ่ายของคุณถูกปฏิเสธด้วยรายละเอียดดังนี้:</p>
          <div style="background: #f3f4f6; padding: 15px; border-radius: 8px; margin: 15px 0;">
            <p><strong>หมวดหมู่:</strong> ${category}</p>
            <p><strong>จำนวนเงิน:</strong> ${amount.toLocaleString()} บาท</p>
            <p><strong>เหตุผลที่ปฏิเสธ:</strong> ${rejectReason}</p>
          </div>
          <p>หากมีข้อสงสัยกรุณาติดต่อฝ่ายทรัพยากรบุคคล</p>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);
    res.json({ success: true, message: 'ส่งอีเมลแจ้งเตือนเรียบร้อยแล้ว' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ success: false, message: 'เกิดข้อผิดพลาดในการส่งอีเมล' });
  }
});

// Send new disbursement notification email
app.post('/api/disbursement/new-notification', async (req, res) => {
  try {
    const { employeeName, category, amount, details, date } = req.body;

    const mailOptions = {
      from: 'mamm0n715120@gmail.com',
      to: 'nuania715120@gmail.com',
      subject: 'มีการสร้างรายการเบิกจ่ายใหม่',
      html: `
        <div style="font-family: 'Prompt', sans-serif; padding: 20px; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #4F46E5;">มีรายการเบิกจ่ายใหม่</h2>
          <p>รายการเบิกจ่ายใหม่ได้ถูกสร้างโดย ${employeeName}</p>
          <div style="background: #f3f4f6; padding: 15px; border-radius: 8px; margin: 15px 0;">
            <p><strong>พนักงาน:</strong> ${employeeName}</p>
            <p><strong>หมวดหมู่:</strong> ${category}</p>
            <p><strong>จำนวนเงิน:</strong> ${amount.toLocaleString()} บาท</p>
            <p><strong>วันที่:</strong> ${new Date(date).toLocaleDateString('th-TH')}</p>
            <p><strong>รายละเอียด:</strong> ${details}</p>
          </div>
          <p>กรุณาตรวจสอบและดำเนินการต่อไป</p>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);
    res.json({ success: true, message: 'ส่งอีเมลแจ้งเตือนเรียบร้อยแล้ว' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ success: false, message: 'เกิดข้อผิดพลาดในการส่งอีเมล' });
  }
});

// Apply error handler
app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});