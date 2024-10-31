<script setup lang="ts">
import apify from '~/composables/useAPI';
import type { IUser, IResponse } from '~/types';
import { branches } from '~/types';
import { useToast } from '~/components/ui/toast';
import { LucideEdit, LucideShuffle } from 'lucide-vue-next';


definePageMeta({
    layout: "admin"
});
useHead({
    title: "Xodimlar"
});


const { toast } = useToast();

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
const users = ref<IUser[]>();
const userModalOpen = ref(false);

onMounted(async () => {
    getUsers();
});

const getUsers = async () => {
    let response = await $fetch<IUser[]>(apify("users"));
    users.value = response;
}

const addUser = async () => {
    if (user.value) {
        let response = await $fetch<IResponse<object>>(apify("users/add"), {
            method: "POST",
            body: JSON.stringify({
                "username": user.value.username,
                "first_name": user.value.first_name,
                "last_name": user.value.last_name,
                "middle_name": user.value.middle_name,
                "phone": user.value.phone,
                "branch": user.value.branch,
                "department": user.value.department,
                "position": user.value.position,
                "password": user.value.pwd,
                "role": user.value.role,
            })
        });
        if (response.status === "success") {
            toast({
                title: "Ajoyib",
                description: "Xodim qo'shildi"
            });
            getUsers();
        } else {
            toast({
                title: "Xatolik",
                description: "Barcha maydonni toldiring."
            });
        }
    }
    userModalOpen.value = false;
}

const editUser = async (user: IUser) => {
    let response = await $fetch<IResponse<string>>(apify(`users/${user.uuid}/edit`), {
        method: "POST",
        body: JSON.stringify({
            "first_name": user.first_name,
            "last_name": user.last_name,
            "middle_name": user.middle_name,
            "phone": user.phone,
            "branch": user.branch,
            "department": user.department,
            "position": user.position,
            "password": user.pwd,
            "role": user.role,
        })
    });
    if (response.status === "success") {
        toast({
            title: "Ajoyib",
            description: "Xodim tahrirlandi"
        });
        getUsers();
    } else {
        toast({
            title: "Xatolik",
            description: "Barcha maydonni toldiring."
        });
    }
    userModalOpen.value = false;
}

</script>

<template>
    <div class="p-5 md:p-10 flex flex-col gap-5">
        <div class="flex items-center justify-between">
            <p>Xodimlar</p>
            <Dialog v-model:open="userModalOpen">
                <DialogTrigger>
                    <Button>Xodim qo'shish</Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Yangi xodim qo'shish</DialogTitle>
                    </DialogHeader>
                    <div>
                        <Label>Foydalanuvchi nomi</Label>
                        <Input v-model="user.username" />
                        <div class="flex gap-3 flex-col md:flex-row">
                            <div class="w-full">
                                <Label>Ism </Label>
                                <Input v-model="user.first_name" />
                            </div>
                            <div class="w-full">
                                <Label>Familiya </Label>
                                <Input v-model="user.last_name" />
                            </div>
                            <div class="w-full">
                                <Label>Sharifi </Label>
                                <Input v-model="user.middle_name" />
                            </div>
                        </div>
                        <Label>Telefon raqami </Label>
                        <Input v-model="user.phone" />
                        <Label>Filial</Label>
                        <Select v-model="user.branch">
                            <SelectTrigger>
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem v-for="branch in branches" :value="branch">{{ branch }}</SelectItem>
                            </SelectContent>
                        </Select>
                        <Label>Bo'lim </Label>
                        <Input v-model="user.department" />
                        <Label>Lavozimi </Label>
                        <Input v-model="user.position" />
                        <Label>Parol </Label>
                        <div class="relative">
                            <Input v-model="user.pwd" />
                            <div class="absolute top-0 right-0">
                                <Button @click="user.pwd = autogen()" variant="xs"><LucideShuffle :size="16" /> </Button>
                            </div>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button @click="addUser">Qo'shish</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
        <div class="border rounded-md overflow-x-auto">
            <Table class="whitespace-nowrap">
                <TableHeader class="border-b">
                    <TableHead>#</TableHead>
                    <TableHead>Foydalanuvchi nomi</TableHead>
                    <TableHead>Ism, familiya va sharifi</TableHead>
                    <TableHead>Telefon raqami</TableHead>
                    <TableHead>Filial</TableHead>
                    <TableHead>Bo'lim</TableHead>
                    <TableHead>Lavozimi</TableHead>
                    <TableHead>Tahrirlash</TableHead>
                </TableHeader>
                <TableBody>
                    <TableRow v-for="user, index in users">
                        <TableCell class="border-r">{{ index+1 }}</TableCell>
                        <TableCell>{{ user.username }}</TableCell>
                        <TableCell>{{ user.first_name }} {{ user.last_name }} {{ user.middle_name }}</TableCell>
                        <TableCell>{{ user.phone }}</TableCell>
                        <TableCell>{{ user.branch }}</TableCell>
                        <TableCell>{{ user.department }}</TableCell>
                        <TableCell>{{ user.position }}</TableCell>
                        <TableCell>
                            <Dialog>
                                <DialogTrigger>
                                    <Button size="icon"><LucideEdit :size="16" /> </Button>
                                </DialogTrigger>
                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle>Xodimni tahrirlash</DialogTitle>
                                    </DialogHeader>
                                    <div>
                                        <div>
                                            <div class="flex gap-3 flex-col md:flex-row">
                                                <div class="w-full">
                                                    <Label>Ism </Label>
                                                    <Input v-model="user.first_name" />
                                                </div>
                                                <div class="w-full">
                                                    <Label>Familiya </Label>
                                                    <Input v-model="user.last_name" />
                                                </div>
                                                <div class="w-full">
                                                    <Label>Sharifi </Label>
                                                    <Input v-model="user.middle_name" />
                                                </div>
                                            </div>
                                            <Label>Telefon raqami </Label>
                                            <Input v-model="user.phone" />
                                            <Label>Filial</Label>
                                            <Select v-model="user.branch">
                                                <SelectTrigger>
                                                    <SelectValue />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem v-for="branch in branches" :value="branch">{{ branch }}</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <Label>Bo'lim </Label>
                                            <Input v-model="user.department" />
                                            <Label>Lavozimi </Label>
                                            <Input v-model="user.position" />
                                            <Label>Parol </Label>
                                            <Input v-model="user.pwd" />
                                        </div>
                                    </div>
                                    <DialogFooter>
                                        <Button @click="editUser(user)">Tahrirlash</Button>
                                    </DialogFooter>
                                </DialogContent>
                            </Dialog>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </div>
    </div>
</template>
