import { writeFileSync } from 'fs';

const records = [];
for (let i = 1; i <= 200; i++) {
    records.push({
        id: i,
        name: `User ${i}`,
        email: `user${i}@example.com`,
        status: i % 2 === 0 ? 'active' : 'inactive',
        newField: `${1000 + i}`
    });
}

const db = {
    header: ['id', 'name', 'email', 'status', 'newField'],
    records
};

writeFileSync('db_obj.json', JSON.stringify(db, null, 2));
