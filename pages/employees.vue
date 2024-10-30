<script setup lang="ts">
import apify from '~/composables/useAPI';
import type { IEmployee, IResponse } from '~/types';
import { useToast } from '~/components/ui/toast';
import { LucideEdit } from 'lucide-vue-next';


definePageMeta({
    layout: "admin"
});
useHead({
    title: "Xodimlar"
});


const { toast } = useToast();

const employee = ref<IEmployee>({
    id: "0",
    username: "",
    first_name: "",
    last_name: "",
    phone: "",
    pwd: "",
    role: "emploee",
});
const employees = ref<IEmployee[]>();
const emploeeModalOpen = ref(false);

onMounted(async () => {
    getUsers();
});

const getUsers = async () => {
    let result = await $fetch<IEmployee[]>(apify("users"));
    employees.value = result;
}

const addUser = async () => {
    let result = await $fetch<IResponse>(apify("users/add"), {
        method: "POST",
        body: JSON.stringify({
            "username": employee.value.username,
            "first_name": employee.value.first_name,
            "last_name": employee.value.last_name,
            "phone": employee.value.phone,
            "password": employee.value.pwd,
            "role": employee.value.role,
        })
    });
    if (result.status === "success") {
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
    emploeeModalOpen.value = false;
}

const editUser = async (user: IEmployee) => {
    let result = await $fetch<IResponse>(apify(`users/${user.id}/edit`), {
        method: "POST",
        body: JSON.stringify({
            "username": user.username,
            "first_name": user.first_name,
            "last_name": user.last_name,
            "phone": user.phone,
            "password": user.pwd,
            "role": user.role,
        })
    });
    if (result.status === "success") {
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
    emploeeModalOpen.value = false;
}

</script>

<template>
    <div class="p-5 md:p-10 flex flex-col gap-5">
        <div class="flex items-center justify-between">
            <p>Xodimlar</p>
            <Dialog v-model:open="emploeeModalOpen">
                <DialogTrigger>
                    <Button>Xodim qo'shish</Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Yangi xodim qo'shish</DialogTitle>
                    </DialogHeader>
                    <div>
                        <Label>Foydalanuvchi nomi</Label>
                        <Input v-model="employee.username" />
                        <Label>Ism </Label>
                        <Input v-model="employee.first_name" />
                        <Label>Familiya </Label>
                        <Input v-model="employee.last_name" />
                        <Label>Telefon raqami </Label>
                        <Input v-model="employee.phone" />
                        <Label>Parol </Label>
                        <Input v-model="employee.pwd" />
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
                    <TableHead>Username</TableHead>
                    <TableHead>First name</TableHead>
                    <TableHead>Last name</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>Password</TableHead>
                    <TableHead></TableHead>
                </TableHeader>
                <TableBody>
                    <TableRow v-for="user, index in employees">
                        <TableCell>{{ index+1 }}</TableCell>
                        <TableCell>{{ user.username }}</TableCell>
                        <TableCell>{{ user.first_name }}</TableCell>
                        <TableCell>{{ user.last_name }}</TableCell>
                        <TableCell>{{ user.phone }}</TableCell>
                        <TableCell>{{ user.pwd }}</TableCell>
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
                                        <Label>Foydalanuvchi nomi</Label>
                                        <Input v-model="user.username" />
                                        <Label>Ism </Label>
                                        <Input v-model="user.first_name" />
                                        <Label>Familiya </Label>
                                        <Input v-model="user.last_name" />
                                        <Label>Telefon raqami </Label>
                                        <Input v-model="user.phone" />
                                        <Label>Parol </Label>
                                        <Input v-model="user.pwd" />
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
