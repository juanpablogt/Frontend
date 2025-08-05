<template>
    <div>
        <p>lorem ipsum</p>
        <div>{{ message }}</div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            message: 'Hello, Vue!'
        };
    }
};
</script>
<style>
p {
    color: blue;
    font-size: 20px;
}
</style>
