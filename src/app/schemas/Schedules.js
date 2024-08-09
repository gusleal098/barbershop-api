import mongoose from 'mongoose';

const ScheduleSchema = new mongoose.Schema({
    user: {
        id: {
          type: String,
          required: true
        },
        name: {
          type: String,
          required: true
        },
        phone_number: {
          type: String,
          required: true
        }
    },

    products: [
      {
        id: {
          type: Number,
          required: true
        },
        name: {
          type: String,
          required: true
        },
        price: {
          type: Number,
          required: true
        },
        category: {
          type: String,
          required: true
        },
        url: {
          type: String,
          required: true
        }
      }
    ],
    date: [
      {
        id: {
          type: Number,
          required: true
        },
        date: {
          type: Date,
          required:true
        }
      }
    ],

    times: [
      {
        id: {
          type: Number,
          required: true
        },
        times: {
          type: String,
          required: true
        }
      }
    ],

    status: {
      type: String,
      required: true
    },
},
{
    timestamps: true
}
);

export default mongoose.model('Schedule', ScheduleSchema);