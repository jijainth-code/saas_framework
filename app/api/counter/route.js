export async function POST(request) {
  try {
    const body = await request.json();
    console.log('🎉 Button clicked!', body);
    
    return Response.json({ 
      success: true, 
      message: 'Button click logged successfully! 🚀',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('❌ Error processing button click:', error);
    return Response.json({ 
      success: false, 
      message: 'Error processing request' 
    }, { status: 500 });
  }
}
