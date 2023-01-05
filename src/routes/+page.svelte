<script lang="ts">
    let value: string = "hello"
    let second: string = "absolutely positioned"
</script>

<main>
    <div>
        <img src="/image?text={value}&second={second}" alt="testing the thing">
        <p>
            open in new windows: <a href="/image?text={value}&second={second}" target="_blank" rel="noopener noreferrer">/image?text={value}&second={second}</a>
        </p>
    </div>
    <div>
        <input bind:value />
        <input bind:value={second} />
    </div>
    
</main>

<h1>svelte-component-to-image</h1>
<p>Visit <a href="https://github.com/StephenGunn/svelte-component-to-image">https://github.com/StephenGunn/svelte-component-to-image</a> for instructions.</p>
