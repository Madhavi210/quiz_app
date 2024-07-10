
import mongoose, { Schema } from 'mongoose';
import { IExam } from '../interface/exam.interface';

const ExamSchema: Schema = new Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: [true, 'User ID is required']
    },

    questions: [{
        _id:false,  
        question: {
            type: Schema.Types.ObjectId,
            ref: 'Question',
            required: [true, 'Question ID is required']
        },
        difficulty: {
            type: Number,
            required: [true, 'Difficulty is required'],
            min: [1, 'Difficulty must be at least 1'],
            max: [10, 'Difficulty cannot exceed 10']
        },
        selectedAnswer: { type: String }
    }],
    date: {
        type: Date,
        default: Date.now
    }
});

const Exam = mongoose.model<IExam>('Exam', ExamSchema);
export default Exam;
