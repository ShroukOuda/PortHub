const { ObjectId } = require('mongodb');

const user1Id = new ObjectId();
const user2Id = new ObjectId();
const user3Id = new ObjectId();
const user4Id = new ObjectId();

// Note: These passwords will be hashed by the seed script
// Use these passwords to login: Password@123
const users = [
  {
    _id: user1Id,
    firstName: "John",
    lastName: "Doe",
    username: "johndoe",
    email: "john.doe@example.com",
    phone: "+1234567890",
    password: "Password@123",
    profilePicture: "https://i.pravatar.cc/150?img=1",
    bio: "Full-stack developer with 5+ years of experience in modern web technologies.",
    gender: "male",
    dateOfBirth: "1990-05-15",
    country: "United States",
    city: "New York",
    address: "123 Main Street, Apartment 4B",
    jobTitle: "Full Stack Developer",
    role: "user"
  },
  {
    _id: user2Id,
    firstName: "Sarah",
    lastName: "Johnson",
    username: "sarahjohnson",
    email: "sarah.johnson@example.com",
    phone: "+1987654321",
    password: "Password@123",
    profilePicture: "https://i.pravatar.cc/150?img=2",
    bio: "Creative UI/UX designer passionate about creating intuitive user experiences.",
    gender: "female",
    dateOfBirth: "1992-08-22",
    country: "Canada",
    city: "Toronto",
    address: "456 Oak Avenue, Suite 12",
    jobTitle: "UI/UX Designer",
    role: "user"
  },
  {
    _id: user3Id,
    firstName: "Ali",
    lastName: "Hassan",
    username: "alihassan",
    email: "ali.hassan@example.com",
    phone: "+201234567890",
    password: "Password@123",
    profilePicture: "https://i.pravatar.cc/150?img=3",
    bio: "Backend developer specializing in .NET and cloud systems.",
    gender: "male",
    dateOfBirth: "1995-02-12",
    country: "Egypt",
    city: "Cairo",
    address: "78 Nile Street",
    jobTitle: "Backend Developer",
    role: "user"
  },
  {
    _id: user4Id,
    firstName: "Emily",
    lastName: "Smith",
    username: "emilysmith",
    email: "emily.smith@example.com",
    phone: "+442012345678",
    password: "Password@123",
    profilePicture: "https://i.pravatar.cc/150?img=4",
    bio: "Frontend Angular developer with passion for design systems.",
    gender: "female",
    dateOfBirth: "1993-07-30",
    country: "United Kingdom",
    city: "London",
    address: "22 Baker Street",
    jobTitle: "Frontend Developer",
    role: "user"
  }
];

module.exports = {
  users,
  user1Id,
  user2Id,
  user3Id,
  user4Id
};
