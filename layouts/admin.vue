<script setup lang="ts">
import { LucideFlaskConical, LucideLayoutGrid, LucideLogOut, LucideText, LucideUser, LucideUsers, LucideZap } from 'lucide-vue-next';

const route = useRoute();
</script>

<template>
    <div class="h-screen flex">
        <div class="w-14 sm:w-64 md:w-64 border-r bg-accent/30">
            <div class="h-[3rem] flex gap-2 items-center justify-center md:justify-start">
                <LucideZap :size="20" />
                <p class="hidden md:block text-2xl">EcoTest</p>
            </div>
            <div class="hidden md:flex flex-col gap-1 p-2">
                <NuxtLink :to="{ name: 'index' }" class="flex items-center gap-2 p-1" :class="route.name === 'index' ? 'font-bold' : 'text-muted-foreground'">
                    <LucideLayoutGrid :size="20" />
                    <span>Bosh sahifa</span>
                </NuxtLink>
                <NuxtLink :to="{ name: 'employees' }" class="flex items-center gap-2 p-1" :class="route.name === 'employees' ? 'font-bold' : 'text-muted-foreground'">
                    <LucideUsers :size="20" />
                    <span>Xodimlar</span>
                </NuxtLink>
                <NuxtLink :to="{ name: 'tests' }" class="flex items-center rounded-md gap-2 p-1" :class="route.name === 'tests' ? 'font-bold' : 'text-muted-foreground'">
                    <LucideFlaskConical :size="20" />
                    <span>Testlar</span>
                </NuxtLink>
                <NuxtLink :to="{ name: 'questions' }" class="flex items-center rounded-md gap-2 p-1" :class="route.name === 'questions' ? 'font-bold' : 'text-muted-foreground'">
                    <LucideText :size="20" />
                    <span>Savollar</span>
                </NuxtLink>
            </div>
            <div class="flex md:hidden flex-col gap-1 p-2">
                <NuxtLink class="flex items-center rounded-md gap-2 p-1 text-muted-foreground">
                    <LucideLayoutGrid :size="20" />
                </NuxtLink>
                <NuxtLink class="flex items-center rounded-md gap-2 p-1 font-bold">
                    <LucideLayoutGrid :size="20" />
                </NuxtLink>
            </div>
        </div>
        <div class="flex-1 w-[calc(100%-3.5rem)]">
            <div class="h-[3rem] border-b bg-accent/30 flex items-center justify-between px-5">
                <div></div>
                <DropdownMenu>
                    <DropdownMenuTrigger>
                        <LucideUser />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuItem>
                            <span>Chiqish</span>
                            <DropdownMenuShortcut>
                                <LucideLogOut :size="16" />
                            </DropdownMenuShortcut>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
            <ScrollArea class="h-[calc(100%-3.1rem)]">
                <slot />
            </ScrollArea>
        </div>
    </div>
</template>