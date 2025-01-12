import mongoose from 'mongoose';

// Определение схемы для задачи (Task)
const taskSchema = new mongoose.Schema({
  // Поле id будет автоматически создано Mongoose
  text: {
    type: String,
    required: true,  // Поле обязательно для заполнения
  },
  status: {
    type: Boolean,
    default: false,  // Статус по умолчанию - не выполнено
  },
}, {
  timestamps: true,  // Создаст поля createdAt и updatedAt
});

// Создание модели Task на основе схемы
export default mongoose.model('Task', taskSchema, "tasks");


