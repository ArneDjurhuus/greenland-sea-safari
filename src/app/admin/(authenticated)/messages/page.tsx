import { getMessages } from '@/app/actions/contactActions';
import MessagesClient from './MessagesClient';

export default async function MessagesPage() {
    const messages = await getMessages();

    return <MessagesClient initialMessages={messages} />;
}
