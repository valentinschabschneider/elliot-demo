<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import * as Select from '$lib/components/ui/select';
	import * as print from '$lib/remote-functions/print.remote';

	const examples = [{ value: 'test', label: 'Test' }];

	let jobId = $derived<string | undefined>(print.generatePdf.result?.id);

	let printing = $state<boolean>(false);

	async function checkStatus() {
		if (!jobId) return;

		const status = await print.checkStatus(jobId);

		console.log('Status:', status);

		if (status.state === 'completed') {
			printing = false;

			console.log('PDF is ready:', status);
		}
	}

	const examplePrintForm = print.generatePdf.enhance(async ({ form, data, submit }) => {
		try {
			printing = true;

			await submit();

			console.log('PDF generation started with job ID:', jobId);
		} catch (error) {
			console.error('Error during PDF generation:', error);

			printing = false;
		}
	});
</script>

<h1>Recent posts</h1>

<span>{jobId}</span>

<form {...examplePrintForm}>
	<Select.Root type="single" name="example">
		<Select.Trigger class="w-[180px]"></Select.Trigger>
		<Select.Content>
			<Select.Group>
				<Select.Label>Examples</Select.Label>
				{#each examples as example (example.value)}
					<Select.Item value={example.value} label={example.label} />
				{/each}
			</Select.Group>
		</Select.Content>
	</Select.Root>

	<Button type="submit" disabled={printing}>start print</Button>
</form>

<Button onclick={checkStatus} disabled={!jobId}>Check status</Button>
