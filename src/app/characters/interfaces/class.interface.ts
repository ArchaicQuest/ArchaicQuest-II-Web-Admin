export interface SkillList {
    skillId: number;
    SkillName: string;
    Level: number;
}

export interface Class {
    id: number;
    name: string;
    description: string;
    skills?: SkillList[]
}
