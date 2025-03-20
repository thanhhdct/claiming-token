const { MongoClient } = require('mongodb');

// URI kết nối tới MongoDB (localhost nếu bạn dùng Docker)
const uri = 'mongodb://localhost:27017';

// Tên cơ sở dữ liệu bạn muốn tạo
const dbName = 'myNewDatabase';

async function createDatabase() {
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

    try {
        // Kết nối tới MongoDB
        await client.connect();
        console.log('Connected to MongoDB');

        // Tạo cơ sở dữ liệu mới (MongoDB sẽ tạo cơ sở dữ liệu này khi bạn thực hiện một thao tác vào cơ sở dữ liệu đó)
        const db = client.db(dbName);

        // Thực hiện một thao tác đơn giản để tạo cơ sở dữ liệu
        const collection = db.collection('newCollection');
        // await collection.insertOne({ name: 'test', value: 'any value', customId: 2, newCol: true });
        const result = await collection.findOne({})
        console.log("🚀 ~ createDatabase ~ result:", result)

        console.log(`Database ${dbName} created successfully`);

    } catch (err) {
        console.error('Error:', err);
    } finally {
        // Đảm bảo rằng bạn luôn đóng kết nối khi xong
        await client.close();
    }
}

createDatabase().catch(console.error);
