import employeesJson from './employees.sql?raw'

export const getEmployees = () => {
  try {
    // Split the file content into individual JSON objects and parse them
    const employeesArray = employeesJson
      .split('}')
      .filter(json => json.trim())
      .map(json => JSON.parse(json + '}'))
    
    return employeesArray
  } catch (error) {
    console.error('Error parsing employees data:', error)
    return []
  }
}

export const employeeDetails = {
  "345321231": {
    name: "Darlene Robertson",
    nickname: "Darlie",
    employeeId: "345321231",
    email: "darlene@example.com",
    phone: "+66 98 765 4321",
    department: "Design",
    designation: "UI/UX Designer", 
    type: "Office",
    status: "Permanent",
    imageUrl: "https://randomuser.me/api/portraits/women/1.jpg",
    personalInfo: {
      dateOfBirth: "1992-03-15",
      gender: "Female",
      address: "123 Sukhumvit Road",
      city: "Bangkok",
      state: "Bangkok",
      zipCode: "10110",
      nationality: "Thai",
      maritalStatus: "Single"
    },
    workInfo: {
      dateJoined: "2022-01-15",
      employeeType: "Full Time",
      workingDays: "Monday - Friday",
      officeLocation: "Bangkok HQ",
      reportTo: "Robert Allen",
      shift: "9:00 AM - 6:00 PM"
    },
    bankInfo: {
      bankName: "Bangkok Bank",
      accountName: "Darlene Robertson",
      accountNumber: "xxx-x-x1234-x",
      ifscCode: "BKKBTHBK"
    },
    emergencyContact: {
      name: "John Robertson",
      relationship: "Brother",
      phone: "+66 91 234 5678",
      address: "456 Silom Road, Bangkok"
    }
  }
  // Add more employee details as needed
}