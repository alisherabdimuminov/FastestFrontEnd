<script setup lang="ts">

interface IQuestion {
    question: string
    answer_a: string
    answer_b: string
    answer_c: string
    answer_d: string
    correct_answer: string
}

const rawQuestions = ref("");
const questions = ref<IQuestion[]>([]);


const parseRawQuestions = () => {
    questions.value = [];
    let splittedRawQuestions = rawQuestions.value.split("\n\n");
    splittedRawQuestions.forEach((splittedRawQuestion) => {
        let question = splittedRawQuestion.split("\n");
        let content = question[0];
        let answer_a = question[1];
        let answer_b = question[2];
        let answer_c = question[3];
        let answer_d = question[4];
        let q: IQuestion = { "question": content, "answer_a": answer_a, "answer_b": answer_b, "answer_c": answer_c, "answer_d": answer_d, correct_answer: "a" };
        questions.value.push(q);
    });
    console.log(splittedRawQuestions);
}

watch(rawQuestions, (newValue) => {
    parseRawQuestions();
    console.log(questions);
});

definePageMeta({
    layout: "admin"
});
</script>

<template>
    <div class="h-full p-5 md:p-10 flex flex-col gap-5">
        <div class="flex h-full border">
            <Textarea cols="20" v-model="rawQuestions" />
            <div class="w-full p-2">
                <div v-for="question, index in questions">
                    <p>{{ index+1 }}. {{ question.question }}</p>

                    <p class="ml-6">a) {{ question.answer_a }}</p>
                    <p class="ml-6">b) {{ question.answer_b }}</p>
                    <p class="ml-6">c) {{ question.answer_c }}</p>
                    <p class="ml-6">d) {{ question.answer_d }}</p>
                </div>
            </div>
        </div>
    </div>
</template>
