const sqlite3 = require('sqlite3')
const fs = require('fs')

const exits = checkIfDatabaseExists()

const db = new sqlite3.Database('public/database/data.db', (err) => {
    if (err) {
        console.log("Error opening database: " + err)    
    } else {
        console.log("Connected to database")
        if (!exits) {
            console.log("Creating database...")
            createDB()
        } else {
            console.log("Database already exists. Skips creating...")
        }    
    }
})
// SQL query to create the users table
const createUsersTableQuery = `
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY,
    username TEXT UNIQUE,
    password TEXT
  )
`

// SQL query to create the posts table
const createPostsTableQuery = `
  CREATE TABLE IF NOT EXISTS posts (
    id INTEGER PRIMARY KEY,
    title TEXT,
    content TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )
`

// SQL query to create the files table
const createFilesTableQuery = `
  CREATE TABLE IF NOT EXISTS files (
    id INTEGER PRIMARY KEY,
    post_id INTEGER,
    file_name TEXT,
    file_path TEXT,
    file_type TEXT,
    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE
  )
`

function createDB() {
    db.serialize(() => {
        db.run(createUsersTableQuery)
        db.run(createFilesTableQuery)
        db.run(createPostsTableQuery)
    })
}

function checkIfDatabaseExists() {
    const databaseFile = 'public/database/data.db'
    return fs.existsSync(databaseFile)
}

module.exports = db