/**
 * ARK SPACES — Video to WebP Frame Extraction Tool
 * Reads source video metadata and extracts optimized WebP frame sequences
 * for desktop (landscape) and mobile (portrait) scroll scrubbing.
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '..');

const CONFIGS = [
  {
    name: 'desktop',
    source: path.join(ROOT_DIR, 'video for desktop.mp4'),
    outputDir: path.join(ROOT_DIR, 'public', 'frames', 'desktop'),
    targetFrames: 120,
    maxWidth: 1280,
    maxHeight: 720,
    quality: 80
  },
  {
    name: 'mobile',
    source: path.join(ROOT_DIR, 'video for mobile.mp4'),
    outputDir: path.join(ROOT_DIR, 'public', 'frames', 'mobile'),
    targetFrames: 120,
    maxWidth: 720,
    maxHeight: 1280,
    quality: 78
  }
];

function probeVideo(videoPath) {
  try {
    const stdout = execSync(
      `ffprobe -v error -select_streams v:0 -show_entries stream=width,height,duration,r_frame_rate,nb_frames -of json "${videoPath}"`,
      { encoding: 'utf8' }
    );
    const data = JSON.parse(stdout);
    const stream = data.streams && data.streams[0];
    if (!stream) throw new Error('No video stream found');
    
    let duration = parseFloat(stream.duration);
    if (isNaN(duration) || duration <= 0) {
      // Fallback: check format duration
      const fmtOut = execSync(`ffprobe -v error -show_entries format=duration -of json "${videoPath}"`, { encoding: 'utf8' });
      duration = parseFloat(JSON.parse(fmtOut).format.duration) || 10.0;
    }

    return {
      width: parseInt(stream.width, 10),
      height: parseInt(stream.height, 10),
      duration: duration,
      r_frame_rate: stream.r_frame_rate
    };
  } catch (err) {
    console.error(`Error probing video ${videoPath}:`, err.message);
    return null;
  }
}

function cleanDir(dir) {
  if (fs.existsSync(dir)) {
    const files = fs.readdirSync(dir);
    for (const f of files) {
      if (f.endsWith('.webp') || f.endsWith('.json')) {
        fs.unlinkSync(path.join(dir, f));
      }
    }
  } else {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function extractSequence(cfg) {
  console.log(`\n========================================`);
  console.log(`Processing: ${cfg.name.toUpperCase()}`);
  console.log(`Source: ${cfg.source}`);
  console.log(`Output: ${cfg.outputDir}`);

  if (!fs.existsSync(cfg.source)) {
    console.error(`ERROR: Source video file not found at: ${cfg.source}`);
    return false;
  }

  const meta = probeVideo(cfg.source);
  if (!meta) return false;

  console.log(`Detected: ${meta.width}x${meta.height}, duration: ${meta.duration.toFixed(2)}s`);

  // Calculate sampling fps to achieve approximately cfg.targetFrames
  const fps = (cfg.targetFrames / meta.duration).toFixed(4);
  console.log(`Sampling rate: ${fps} fps for ~${cfg.targetFrames} frames`);

  cleanDir(cfg.outputDir);

  const outPattern = path.join(cfg.outputDir, 'frame_%04d.webp');
  const scaleFilter = `scale=${cfg.maxWidth}:${cfg.maxHeight}`;
  const vf = `fps=${fps},${scaleFilter}`;

  const cmd = `ffmpeg -y -i "${cfg.source}" -vf "${vf}" -c:v libwebp -quality ${cfg.quality} -compression_level 4 "${outPattern}"`;
  console.log(`Executing: ${cmd}`);
  
  execSync(cmd, { stdio: 'inherit' });

  // Count generated frames
  const generatedFiles = fs.readdirSync(cfg.outputDir).filter(f => f.startsWith('frame_') && f.endsWith('.webp'));
  generatedFiles.sort();
  const count = generatedFiles.length;

  console.log(`Extracted ${count} frames successfully!`);

  // Write metadata descriptor file for frontend consumption
  const metadata = {
    name: cfg.name,
    frameCount: count,
    width: cfg.maxWidth,
    height: cfg.maxHeight,
    aspectRatio: (cfg.maxWidth / cfg.maxHeight).toFixed(4),
    pattern: `/frames/${cfg.name}/frame_{index}.webp`,
    firstFrame: `/frames/${cfg.name}/${generatedFiles[0]}`,
    lastFrame: `/frames/${cfg.name}/${generatedFiles[count - 1]}`,
    generatedAt: new Date().toISOString()
  };

  fs.writeFileSync(
    path.join(cfg.outputDir, 'meta.json'),
    JSON.stringify(metadata, null, 2),
    'utf8'
  );

  return true;
}

function main() {
  const target = process.argv[2];
  const configsToRun = target 
    ? CONFIGS.filter(c => c.name.toLowerCase() === target.toLowerCase())
    : CONFIGS;

  console.log(`ARK SPACES — Automated Frame Extraction Starting for: ${configsToRun.map(c => c.name).join(', ')}...`);
  for (const cfg of configsToRun) {
    extractSequence(cfg);
  }
  console.log('\nAll targeted frame sequences extracted and ready for ScrollTrigger canvas rendering!');
}

main();
