import { Data, Filter, Question } from "./types"

export function applyFilters(data: Data, filters: Filter[]): Question[] {
    return data.questions.filter((question) => {
        return filters.every((filter) => {
            let questionValue, filterValue;
            const filterQuestion = question.id === filter.id;
            
            if (!filterQuestion) return false;

            switch (question.type) {
                case "DatePicker":
                    questionValue = new Date(question.value!);
                    filterValue = new Date(filter.value);
                    break;
                case "NumberInput":
                    questionValue = Number(question.value!);
                    filterValue = Number(filter.value);
                    break;
                default:
                    questionValue = question.value!;
                    filterValue = filter.value;
            }

            switch (filter.condition) {
                case "equals":
                    return question.value === filter.value;
                case "does_not_equal":
                    return question.value !== filter.value;
                case "greater_than":
                    return new Date(question.value!) > new Date(filter.value);
                case "less_than":
                    return new Date(question.value!) < new Date(filter.value);
                default:
                    return false;
            }
        });
    });
}
