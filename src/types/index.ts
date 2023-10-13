export type Message = {
    role: "user" | "assistant";
    content: string;
}

export type Thread = {
    id: string;
    messages: Message[];
    indexes: string[];
}
