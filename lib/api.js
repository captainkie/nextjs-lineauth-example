export async function fetchData(target) {	
	const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${target}`);
	const data = await res.json();

	return data;
}