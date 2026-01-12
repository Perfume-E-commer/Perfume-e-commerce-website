export const getImageUrl = (path: string | undefined) => {
  if (!path) return 'https://ui-avatars.com/api/?name=User&background=6366f1&color=fff';
  if (path.startsWith('http')) return path; 
  
  const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:8080'; 
  return `${baseUrl}${path}`;
}