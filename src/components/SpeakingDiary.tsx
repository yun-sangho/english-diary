import { Typography, Stack, TextField } from '@mui/material';
import { Timer } from './diary/Timer';
import { Navigation } from '@/components/diary/Navigation';

export function SpeakingDiary() {
  return (
    <Stack height={'100%'} justifyContent={'space-evenly'} gap={4}>
      <Stack
        justifyContent={'center'}
        alignItems={'center'}
        height={'50%'}
        p={2}
      >
        <Typography variant={'h4'} fontWeight={700}>
          Please tell me about yourself.
        </Typography>
      </Stack>

      <Timer />
      <TextField label={'Your response'} multiline={true} rows={5}></TextField>
      <Navigation />
    </Stack>
  );
}
