// API: Retrieve Students Above Threshold
// ---------------------------------------
// Task:
// Implement an API to fetch students whose total marks exceed a given threshold.
//
// Endpoint:
// POST /students/above-threshold
//
// Request Body:
// {
//   "threshold": <number>
// }
//
// Response:
// Success: List of students with their names and total marks who meet the criteria.
// Example:
// {
//   "count": 2,
//   "students": [
//     { "name": "Alice Johnson", "total": 433 },
//     { "name": "Bob Smith", "total": 410 }
//   ]
// }
//
// No Matches:
// {
//   "count": 0,
//   "students": []
// }
//
// Purpose:
// Help teachers retrieve and analyze student performance efficiently.


const express = require('express');
const { resolve } = require('path');

const app = express();
const port = 3010;

app.use(express.static('static'));

const students = Array.from({ length: 100 }, (_, i) => {
  const marks = {
      math: Math.floor(Math.random() * 100),
      science: Math.floor(Math.random() * 100),
      english: Math.floor(Math.random() * 100),
      history: Math.floor(Math.random() * 100),
      geography: Math.floor(Math.random() * 100),
  };
  const total = Object.values(marks).reduce((sum, mark) => sum + mark, 0);
  return {
      student_id: (i + 1).toString(),
      name: `Student ${i + 1}`,
      marks,
      total,
  };
});

app.post('/students/above-threshold', (req, res) => {
  const { threshold } = req.body;

  // Input Validation
  if (typeof threshold !== 'number' || isNaN(threshold)) {
      return res.status(400).json({ message: 'Invalid threshold. Must be a number.' });
  }

  const aboveThreshold = students.filter(student => student.total > threshold);

  const result = {
      count: aboveThreshold.length,
      students: aboveThreshold.map(student => ({ name: student.name, total: student.total })),
  };

  res.json(result);
});

app.listen(port, () => {
  console.log(`Server listening on port ${3010}`);
});