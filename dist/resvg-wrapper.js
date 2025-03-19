let Resvg;
export async function getResvg() {
    if (!Resvg) {
        try {
            // We dynamically import resvg-js only when needed
            const module = await import('@resvg/resvg-js');
            Resvg = module.Resvg;
        }
        catch (error) {
            console.error('Failed to import @resvg/resvg-js:', error);
            throw new Error('Failed to load @resvg/resvg-js. Make sure it is installed as a dependency in your project.');
        }
    }
    return Resvg;
}
