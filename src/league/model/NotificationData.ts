export enum NotificationType {
    ERROR = 'Error',
    INFO = 'Info',
    UNKNOWN = "Unknown"
}

export class NotificationData {
    id: number;
    message: string;
    type: NotificationType;


    constructor(message: string, type: NotificationType) {
        this.id = Math.random();
        this.message = message;
        this.type = type;
    }

    static fromObject(obj: any) {
        if (obj instanceof Error) {
            return new NotificationData((obj as Error).message, NotificationType.ERROR);
        } else {
            return new NotificationData(obj.toString(), NotificationType.UNKNOWN);
        }
    }


}