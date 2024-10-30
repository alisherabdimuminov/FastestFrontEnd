<script setup lang="ts">
import { useToast } from '~/components/ui/toast';
import apify from '~/composables/useAPI';
import type { IEmployee, IResponse, ISpec, ITest } from '~/types';


definePageMeta({
    layout: "admin"
});
useHead({
    title: "Testlar"
});

const { toast } = useToast();

const spec = ref<ISpec>({
    id: "1",
    name: ""
});
const specs = ref<ISpec[]>();
const started = ref();
const ended = ref();
const employee = ref<IEmployee>({
    id: "0",
    username: "",
    first_name: "",
    last_name: "",
    phone: "",
    pwd: "",
    role: 'emploee',
});
const test = ref<ITest>({
    name: "",
    employee: employee.value,
    spec: spec.value,
    passed_score: "",
    score: "",
    status: "",
});
const tests = ref<ITest[]>();
const employees = ref<IEmployee[]>();


onMounted(() => {
    getTests();
    getEmployees();
    getSpecs();
});


const getTests = async () => {
    let result = await $fetch<ITest[]>(apify("tests"));
    tests.value = result;
}

const getEmployees = async () => {
    let result = await $fetch<IEmployee[]>(apify("users"));
    employees.value = result;
}

const getSpecs = async () => {
    let result = await $fetch<ISpec[]>(apify("specs"));
    specs.value = result;
}

const addTest = async () => {
    let result = await $fetch<IResponse>(apify("tests/add"), {
        method: "POST",
        body: JSON.stringify({
            "name": test.value.name,
            "employee": test.value.employee.id,
            "spec": test.value.spec.id,
            "passed_score": test.value.passed_score,
        })
    });
    if (result.status === "success") {
        toast({
            title: "Ajoyib",
            description: "Test qo'shildi"
        });
        getTests();
    } else {
        toast({
            title: "Xatolik",
            description: "Xatolik"
        });
    }

}
</script>

<template>
    <div class="p-5 md:p-10 flex flex-col gap-5">
        <div class="flex justify-between">
            <p>Testlar</p>
            <Dialog>
                <DialogTrigger>
                    <Button>Test qo'shish</Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Yangi test qo'shish</DialogTitle>
                    </DialogHeader>
                    <div>
                        <Label>Nomi</Label>
                        <Input v-model="test.name" />
                        <Label>Xodim</Label>
                        <Select v-model="test.employee.id">
                            <SelectTrigger>
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem v-for="user in employees" :value="user.id" >{{ user.first_name }} {{  user.last_name }}</SelectItem>
                            </SelectContent>
                        </Select>
                        <Label>Spec</Label>
                        <Select v-model="test.spec.id">
                            <SelectTrigger>
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem v-for="s in specs" :value="s.id" >{{ s.name }}</SelectItem>
                            </SelectContent>
                        </Select>
                        <Label>O'tish bali</Label>
                        <Input type="number" v-model="test.passed_score" />
                    </div>
                    <DialogFooter>
                        <Button @click="addTest">Qo'shish</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
        <div class="overflow-x-auto border rounded-md">
            <Table>
                <TableHeader class="border-b">
                    <TableHead>#</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Xodim</TableHead>
                    <TableHead>Spec</TableHead>
                    <TableHead>Passed score</TableHead>
                    <TableHead>Score</TableHead>
                    <TableHead>Status</TableHead>
                </TableHeader>
                <TableBody>
                    <TableRow v-for="t, index in tests">
                        <TableCell>{{ index+1 }}</TableCell>
                        <TableCell>{{ t.name }}</TableCell>
                        <TableCell>{{ t.employee.first_name }} {{ t.employee.last_name }}</TableCell>
                        <TableCell>{{ t.spec.name }}</TableCell>
                        <TableCell>{{ t.passed_score }}</TableCell>
                        <TableCell>{{ t.score }}</TableCell>
                        <TableCell>{{ t.status }}</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </div>
    </div>
</template>
