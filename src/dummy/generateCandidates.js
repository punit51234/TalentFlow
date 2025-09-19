import fs from "fs";

const roles = [
  "Frontend Developer",
  "Backend Developer",
  "Full Stack Engineer",
  "React Developer",
  "Senior React Developer",
  "Node.js Engineer",
  "UI/UX Designer",
  "DevOps Engineer",
  "QA Engineer",
  "Data Scientist",
  "Product Manager"
];

const badges = ["Technical", "Design", "Management", "QA", "Ops"];

const locations = [
  "Mumbai, Maharashtra",
  "Bangalore, Karnataka",
  "Delhi, Delhi",
  "Hyderabad, Telangana",
  "Chennai, Tamil Nadu",
  "Pune, Maharashtra",
  "Kolkata, West Bengal",
  "Ahmedabad, Gujarat",
  "Jaipur, Rajasthan",
  "Gurgaon, Haryana"
];

const statuses = ["Applied", "Screening", "Rejected"];

const indianFirstNames = [
  "Aarav", "Vivaan", "Aditya", "Vihaan", "Arjun",
  "Ishaan", "Shaurya", "Rohan", "Karan", "Ananya",
  "Saanvi", "Diya", "Ira", "Aadhya", "Myra",
  "Navya", "Prisha", "Anika", "Tara", "Riya"
];

const indianLastNames = [
  "Sharma", "Verma", "Gupta", "Patel", "Kumar",
  "Mehta", "Reddy", "Singh", "Chopra", "Kapoor",
  "Agarwal", "Joshi", "Malhotra", "Desai", "Bhatia"
];

function randomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomPhone() {
  const firstDigit = randomItem([9, 8, 7, 6]);
  let number = firstDigit.toString();
  for (let i = 0; i < 9; i++) {
    number += Math.floor(Math.random() * 10).toString();
  }
  return `+91 ${number}`;
}

function randomDate() {
  const start = new Date(2023, 0, 1);
  const end = new Date(2024, 11, 31);
  const d = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;
}

function generateCandidate(i) {
  const firstName = randomItem(indianFirstNames);
  const lastName = randomItem(indianLastNames);
  return {
    name: `${firstName} ${lastName}`,
    initials: `${firstName[0]}${lastName[0]}`, // initials for avatar/icon
    role: randomItem(roles),
    badge: randomItem(badges),
    status: randomItem(statuses), // Added status field
    email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}${i}@example.com`,
    phone: randomPhone(),
    location: randomItem(locations),
    experience: `${Math.floor(1 + Math.random() * 10)} years experience`,
    appliedDate: randomDate(),
    about: `${firstName} ${lastName} is experienced in ${randomItem(roles)} roles with skills in React, Node.js, databases, and more.`
  };
}

const candidates = Array.from({ length: 1000 }, (_, i) => generateCandidate(i + 1));

fs.writeFileSync("candidates.json", JSON.stringify(candidates, null, 2));
console.log("1000 Candidates with status generated in candidates.json");