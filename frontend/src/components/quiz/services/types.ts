export type Quiz = {
    uuid: string;
    title: string;
    description: string;
    is_published: boolean;
    author: string;
    image?: string;

    questions?: Question[];
};

export type Question = {
    uuid: string;
    question: string;
    options: Option[];
};

export type Option = {
    uuid: string;
    option: string;
    correct_option: boolean;
};