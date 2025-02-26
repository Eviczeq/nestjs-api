import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './task.entity';
import { CreateTaskSchemaType, UpdateTaskSchemaType } from './dto/taskSchema';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task) private taskRepository: Repository<Task>,
  ) {}
  //Get all tasks
  async findAll(): Promise<Task[]> {
    return this.taskRepository.find();
  }

  //Create a task
  async create(task: CreateTaskSchemaType): Promise<Task> {
    const newTask = this.taskRepository.create(task);

    return this.taskRepository.save(newTask);
  }

  //Update a task

  async update(id: number, task: UpdateTaskSchemaType): Promise<Task> {
    const existingTask = await this.taskRepository.findOne({ where: { id } });
    if (!existingTask) {
      throw new Error(`Task with id ${id} not found`);
    }
    await this.taskRepository.update(id, task);
    return existingTask;
  }
  //Delete a task
  async delete(id: number): Promise<void> {
    const existingTask = await this.taskRepository.findOne({ where: { id } });
    if (!existingTask) {
      throw new Error(`Task with id ${id} not found`);
    }
    await this.taskRepository.delete(id);
  }
}
