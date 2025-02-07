import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { ETaskStatus, IFindAllParameters, TaskDto } from './task.dto';
import {v4 as uuid} from 'uuid';

@Injectable()
export class TaskService {
    private tasks: TaskDto[] = [];

    create(task: TaskDto) {
        task.id = uuid();
        task.status = ETaskStatus.TO_DO;
        this.tasks.push(task);
        console.log(this.tasks);
    }

    findById(id: string): TaskDto {
        const task = this.tasks.find(task => task.id === id);

        if (!task)
            throw new HttpException('Task not found', HttpStatus.NOT_FOUND);

        return task;
    }

    findAll(params: IFindAllParameters): TaskDto[] {
        return this.tasks.filter(task => {
            let match = true;

            if (params.title !== undefined && !task.title.includes(params.title))
                match = false;

            if (params.status !== undefined && !task.status.includes(params.status))
                match = false;

            return match;
        });
    }

    update(task: TaskDto) {
        const index = this.tasks.findIndex(task => task.id === task.id);

        if (index == -1)
            throw new HttpException('Task not found', HttpStatus.NOT_FOUND);

        this.tasks[index] = task;
    }

    remove(id: string) {
        const index = this.tasks.findIndex(task => task.id === id);

        if (index == -1)
            throw new HttpException('Task not found', HttpStatus.NOT_FOUND);

        this.tasks.splice(index, 1);
    }

}
