import sequelize from '../config/connections.js';
import Message from '../models/message.js';

export const seedMessages = async () => {
  try {
    // await sequelize.sync({ force: true }); will reset the tables before sync
    await sequelize.sync();

    const existingMessages = await Message.findAll();
    if (existingMessages.length > 0) {
      console.log("✅ Messages already seeded.");
      return;
    }

    await Message.bulkCreate([
      {
        category: 'Service Request',
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        phone: '123-456-7890',
        comments: 'Need service on my car.',
      },
      {
        category: 'Interest in a Car',
        firstName: 'Jane',
        lastName: 'Smith',
        email: 'jane@example.com',
        phone: '987-654-3210',
        comments: 'Looking to buy a sedan.',
      },
    ]);

    console.log('✅ Messages seeded successfully!');
  } catch (error) {
    console.error('❌ Error seeding messages:', error);
  }
};
