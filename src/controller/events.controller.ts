import { sendEvent } from "../service/events.service";

export async function sendEventToUpdate() {
    return sendEvent();
}
