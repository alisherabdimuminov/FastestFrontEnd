<script setup lang="ts">
import type { ITest, IResponse, IQuestion } from "~/types";
import apify from "~/composables/useAPI";
import { LucideCheck, LucideX, LucideChevronLeft } from "lucide-vue-next";
import { toast } from "~/components/ui/toast";


definePageMeta({
    middleware: "is-auth",
    layout: "user"
});
useHead({
    title: "Davlat ekologik ekspertizasi markazi"
});

const { user } = useAuth();
const route = useRoute();

if (user.value !== null && user.value.role === "admin") {
    navigateTo({ name: "admin" });
}

const test = ref<ITest>();
const answers = ref([]);
const isLoading = ref(false);
const isShown = ref(false);


const getTest = async () => {
    isLoading.value = true;
    let response = await $fetch<ITest>(apify(`tests/test/${route.params.uuid}`), {
        method: "GET",
        headers: {
            "Authorization": `Token ${user.value?.token}`
        }
    });
    test.value = response;
    isLoading.value = false;
}

const setStartTime = async () => {
    isLoading.value = true;
    let start_time = new Date();
    let response = await $fetch(apify(`tests/test/${route.params.uuid}/set_start_time`), {
        method: "POST",
        body: {
            "start_time": `${start_time.getFullYear()}-${start_time.getMonth()+1}-${start_time.getDate()} ${start_time.getHours()}:${start_time.getMinutes()}:${start_time.getSeconds()}`
        },
        headers: {
            "Authorization": `Token ${user.value?.token}`
        },
    });
    getTest();
    isLoading.value = false;
}

const submit = async () => {
    isLoading.value = true;
    let response = await $fetch<IResponse<string>>(apify(`tests/test/${route.params.uuid}/submit`), {
        method: "POST",
        body: JSON.stringify({
            "answers": answers.value.join(",")
        }),
        headers: {
            "Authorization": `Token ${user.value?.token}`
        }
    });
    if (response.status === "error") {
        toast({
            title: "Xatolik",
            description: "Barch savollarni belgilang"
        });
    } else {
        if (response.status === "success") {
            navigateTo("/");
        }
    }
    isLoading.value = false;
}


onMounted(() => {
    getTest();
    setStartTime();
    document.addEventListener("keydown", (event) => {
        if (event.key === 'Escape') {
            event.preventDefault();
            isShown.value = !isShown.value;
        }
    });
});
</script>

<template>
    <div class="p-5 md:p-10 flex flex-col gap-5 sm:mx-16 md:mx-24 lg:mx-64">
        <div class="flex justify-between">
            <Button @click="navigateTo('/')"><LucideChevronLeft /> Orqaga </Button>
            <Button v-if="test && (test.status === 'not_started' || test.status === 'started')" @click="submit" size="xs" variant="destructive">Tugatish</Button>
        </div>
        <p v-if="test" class="text-center text-2xl font-bold">{{ test.name }}</p>
        <div  class="h-full border p-1 md:p-5 bg-accent/30 flex flex-col divide-y">
            <div v-if="test && test.questions" class="p-2" v-for="question, index in test.questions">
                <p class="text-base md:text-lg">{{ index+1 }}. {{ question.question }}</p>
                <RadioGroup class="ml-10 p-2 flex flex-col gap-3" v-model="answers[index]">
                    <div class="flex gap-3">
                        <RadioGroupItem :id="`q_${index+1}_answer_a`" value="a" />
                        <Label :class="{ 'font-bold': question.correct_answer === 'a' && user && user.role === 'anonym' && isShown }" :for="`q_${index+1}_answer_a`">{{ question.answer_a }}</Label>
                    </div>
                    <div class="flex gap-3">
                        <RadioGroupItem :id="`q_${index+1}_answer_b`" value="b" />
                        <Label :class="{ 'font-bold': question.correct_answer === 'b' && user && user.role === 'anonym' && isShown }" :for="`q_${index+1}_answer_b`">{{ question.answer_b }}</Label>
                    </div>
                    <div class="flex gap-3">
                        <RadioGroupItem :id="`q_${index+1}_answer_c`" value="c" />
                        <Label :class="{ 'font-bold': question.correct_answer === 'c' && user && user.role === 'anonym' && isShown }" :for="`q_${index+1}_answer_c`">{{ question.answer_c }}</Label>
                    </div>
                    <div class="flex gap-3">
                        <RadioGroupItem :id="`q_${index+1}_answer_d`" value="d" />
                        <Label :class="{ 'font-bold': question.correct_answer === 'd' && user && user.role === 'anonym' && isShown }" :for="`q_${index+1}_answer_d`">{{ question.answer_d }}</Label>
                    </div>
                </RadioGroup>
            </div>
        </div>
    </div>
</template>
