<script setup lang="ts">
import { LucideChevronRight, LucideFileQuestion, LucideHistory, LucideSigma, LucideUsers, LucideUsers2 } from 'lucide-vue-next';



definePageMeta({
    layout: "admin"
});
</script>

<template>
    <div class="p-5 md:p-10 flex flex-col gap-5">
        <div class="flex gap-5 flex-col md:flex-row">
            <Card class="w-full">
                <CardHeader>
                    <CardTitle>Xodimlar soni</CardTitle>
                </CardHeader>
                <CardContent>
                    <div class="flex items-center justify-between">
                        <p>260</p>
                        <LucideUsers />
                    </div>
                </CardContent>
            </Card>
            <Card class="w-full">
                <CardHeader>
                    <CardTitle>Savollar soni</CardTitle>
                </CardHeader>
                <CardContent>
                    <div class="flex items-center justify-between">
                        <p>260</p>
                        <LucideFileQuestion />
                    </div>
                </CardContent>
            </Card>
            <Card class="w-full">
                <CardHeader>
                    <CardTitle>Testlar soni</CardTitle>
                </CardHeader>
                <CardContent>
                    <div class="flex items-center justify-between">
                        <p>260</p>
                        <LucideSigma />
                    </div>
                </CardContent>
            </Card>
        </div>

        <div class="flex items-center gap-2 justify-between">
            <div class="flex items-center gap-2">
                <LucideUsers2 :size="20" />
                <p class="text-2xl font-bold">Xodimlar</p>
            </div>
            <div>
                <NuxtLink class="text-blue-500 flex items-center gap-1">
                    <span>Barchasi</span>
                    <LucideChevronRight :size="16" />
                </NuxtLink>
            </div>
        </div>
        <div class="border rounded-md">
            <Table>
                <TableHeader class="border-b">
                    <TableHead>#</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Employee</TableHead>
                    <TableHead>Score</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Start date</TableHead>
                    <TableHead>End date</TableHead>
                </TableHeader>
                <TableBody>
                    <TableRow v-for="_ in 10">
                        <TableCell>{{ _ }}</TableCell>
                        <TableCell>Talim sifati</TableCell>
                        <TableCell>Alisher Abdimuminov</TableCell>
                        <TableCell>64%</TableCell>
                        <TableCell>Yiqilgan</TableCell>
                        <TableCell>29/10/2024 12:34:56</TableCell>
                        <TableCell>29/10/2024 12:34:56</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </div>

        <div class="flex items-center gap-2 justify-between">
            <div class="flex items-center gap-2">
                <LucideHistory :size="20" />
                <p class="text-2xl font-bold">Oxirigi testlar</p>
            </div>
            <div>
                <NuxtLink class="text-blue-500 flex items-center gap-1">
                    <span>Barchasi</span>
                    <LucideChevronRight :size="16" />
                </NuxtLink>
            </div>
        </div>
        <div class="border rounded-md">
            <Table>
                <TableHeader class="border-b">
                    <TableHead>#</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Employee</TableHead>
                    <TableHead>Score</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Start date</TableHead>
                    <TableHead>End date</TableHead>
                </TableHeader>
                <TableBody>
                    <TableRow v-for="_ in 10">
                        <TableCell>{{ _ }}</TableCell>
                        <TableCell>Talim sifati</TableCell>
                        <TableCell>Alisher Abdimuminov</TableCell>
                        <TableCell>64%</TableCell>
                        <TableCell>Yiqilgan</TableCell>
                        <TableCell>29/10/2024 12:34:56</TableCell>
                        <TableCell>29/10/2024 12:34:56</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </div>
    </div>
</template>