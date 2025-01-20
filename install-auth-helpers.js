import { execSync } from 'child_process';

try {
  console.log('Installing @supabase/auth-helpers-nextjs...');
  const output = execSync('npm install @supabase/auth-helpers-nextjs', { encoding: 'utf-8' });
  console.log(output);
  console.log('Installation completed successfully.');
} catch (error) {
  console.error('Error during installation:', error.message);
}

