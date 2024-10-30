<script setup lang="ts">
import { useToast } from '~/components/ui/toast';
import apify from '~/composables/useAPI';
import type { IUser, IResponse, ISet, ITest } from '~/types';


definePageMeta({
    layout: "admin"
});
useHead({
    title: "Testlar"
});

const { toast } = useToast();

const set = ref<ISet>({
    id: "1",
    name: ""
});
const sets = ref<ISet[]>();
const start_date = ref("");
const start_time = ref("");
const testOpenModal = ref(false);
const user = ref<IUser>({
    "id": "0",
    "uuid": "",
    "username": "",
    "first_name": "",
    "last_name": "",
    "middle_name": "",
    "phone": "",
    "branch": "",
    "department": "",
    "position": "",
    "role": "user",
    "pwd": autogen(),
    "token": ""
});
const test = ref<ITest>({
    name: "",
    user: user.value,
    set: set.value,
    start_time: "",
    duration: 60,
    passed_score: 70,

    percentage: 0,
    status: "not_started",
    elapsed: 0,
});
const tests = ref<ITest[]>();
const users = ref<IUser[]>();


onMounted(() => {
    getTests();
    getUsers();
    getSpecs();
});


const getTests = async () => {
    let result = await $fetch<ITest[]>(apify("tests"));
    tests.value = result;
}

const getUsers = async () => {
    let result = await $fetch<IUser[]>(apify("users"));
    users.value = result;
}

const getSpecs = async () => {
    let result = await $fetch<ISet[]>(apify("sets"));
    sets.value = result;
}

const addTest = async () => {
    let result = await $fetch<IResponse<string>>(apify("tests/add"), {
        method: "POST",
        body: JSON.stringify({
            "name": test.value.name,
            "user": test.value.user.id,
            "set": test.value.set.id,
            "start_time": `${start_date.value} ${start_time.value}`,
            "duration": test.value.duration,
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
    testOpenModal.value = false;
}

const updateStartDate = (value: any) => {
    start_date.value = value;
}
</script>

<template>
    <div class="p-5 md:p-10 flex flex-col gap-5">
        <div class="flex justify-between">
            <p>Testlar</p>
            <Dialog v-model:open="testOpenModal">
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
                        <Select v-model="test.user.id">
                            <SelectTrigger>
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem v-for="user in users" :value="user.id" >{{ user.first_name }} {{  user.last_name }}</SelectItem>
                            </SelectContent>
                        </Select>
                        <Label>To'plam</Label>
                        <Select v-model="test.set.id">
                            <SelectTrigger>
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem v-for="set in sets" :value="set.id" >{{ set.name }}</SelectItem>
                            </SelectContent>
                        </Select>
                        <Label>Boshlanish vaqti</Label>
                        <div class="flex gap-2">
                            <div class="w-full">
                                <Popover>
                                    <PopoverTrigger>
                                        <Input class="w-full" v-model="start_date" />
                                    </PopoverTrigger>
                                    <PopoverContent>
                                        <Calendar @update:model-value="updateStartDate" />
                                    </PopoverContent>
                                </Popover>
                            </div>
                            <div class="w-full">
                                <Input v-model="start_time" type="time"/>
                            </div>
                        </div>
                        <Label>Davomiyligi (daqiqada)</Label>
                        <Input type="number" v-model="test.duration" />
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
            <Table class="whitespace-nowrap">
                <TableHeader class="border-b">
                    <TableHead>#</TableHead>
                    <TableHead>Nomi</TableHead>
                    <TableHead>Xodim</TableHead>
                    <TableHead>Filial</TableHead>
                    <TableHead>To'plam</TableHead>
                    <TableHead>Boshlanish vaqti</TableHead>
                    <TableHead>Davomiyligi</TableHead>
                    <TableHead>O'tish bali</TableHead>
                    <TableHead>Holati</TableHead>
                    <TableHead>Natija</TableHead>
                    <TableHead>Sarflangan vaqt</TableHead>
                </TableHeader>
                <TableBody>
                    <TableRow v-for="test, index in tests">
                        <TableCell class="border-r">{{ index+1 }}</TableCell>
                        <TableCell>{{ test.name }}</TableCell>
                        <TableCell>{{ test.user.first_name }} {{ test.user.last_name }}</TableCell>
                        <TableCell>{{ test.user.branch }}</TableCell>
                        <TableCell>{{ test.set.name }}</TableCell>
                        <TableCell>{{ test.start_time }}</TableCell>
                        <TableCell>{{ test.duration }}</TableCell>
                        <TableCell>{{ test.passed_score }}</TableCell>
                        <TableCell>
                            <span class="font-bold text-blue-500 border p-1 rounded-md bg-blue-500/10" v-if="test.status === 'not_started'">Boshlanmagan</span>
                            <span class="font-bold text-green-500 border p-1 rounded-md bg-green-500/10" v-if="test.status === 'passed'">O'tgan</span>
                            <span class="font-bold text-red-500 border p-1 rounded-md bg-red-500/10" v-if="test.status === 'failed'">Yiqilgan</span>
                            <span class="font-bold text-orange-500 border p-1 rounded-md bg-orange-500/10" v-if="test.status === 'ended'">Tugagan</span>
                        </TableCell>
                        <TableCell>{{ test.percentage }}</TableCell>
                        <TableCell>{{ test.elapsed }}</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </div>
    </div>
</template>
