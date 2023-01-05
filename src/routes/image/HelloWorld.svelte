<script lang="ts">
    export let text: string
    export let second: string
</script>

<div id="container">
    <h1>
        {text} world!
    </h1>
    <div class="square">
        {second}
    </div>
</div>


<style>
    #container {
        width: 1200px;
        height: 600px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-family: Montserrat;
        position: relative;
        background: rgb(63,94,251);
        background: radial-gradient(circle, rgba(63,94,251,1) 0%, rgba(252,70,107,1) 100%);
    }
    h1 {
        color: red;
        font-size: 75px;
        
    }
    .square {
        position: absolute;
        bottom: 1rem;
        left: 1rem;
        background: black;
        color: white;
        padding: 2rem;
        font-size: 50px;
    }
</style>