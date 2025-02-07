import { IsDateString, IsEnum, IsOptional, IsString, IsUUID, MaxLength, MinLength } from "class-validator";

export enum ETaskStatus {
    TO_DO = 'TO_DO',
    IN_PROGRESS = 'IN_PROGRESS',
    DONE = 'DONE'
}

export class TaskDto {
    @IsUUID()
    id: string;

    @IsString()
    @MinLength(3)
    @MaxLength(256)
    title: string;

    @IsString()
    @MinLength(3)
    @MaxLength(256)
    description: string;

    @IsEnum(ETaskStatus)
    @IsOptional()
    status: string;

    @IsDateString()
    expirationDate: Date;
}

export interface IFindAllParameters {
    title?: string;
    status?: string;
}