// Issue: Single class is trying to do everything
class LoggingService {
  log(destination: string, message: string): void {
    if (destination === "console") {
      console.log(`[LOG] ${message}`);
    } else if (destination === "file") {
      // Open file, write message, close file
    } else if (destination === "remote") {
      // Create HTTP connection, send payload, handle response
    }
  }
}

abstract class Logger {
  protected level: string;

  constructor(level: string) {
    this.level = level;
  }

  // Abstract method: subclasses decide HOW to deliver the message
  abstract log(message: string): void;

  // Concrete method: shared formatting logic inherited by all subclasses
  formatMessage(message: string): string {
    const timestamp = new Date()
      .toISOString()
      .replace("T", " ")
      .substring(0, 19);
    return `[${timestamp}] [${this.level}] ${message}`;
  }
}

class ConsoleLogger extends Logger {
  constructor(level: string) {
    super(level);
  }

  log(message: string): void {
    console.log(this.formatMessage(message));
  }
}

class FileLogger extends Logger {
  private filePath: string;
  constructor(level: string, filePath: string) {
    super(level);
    this.filePath = filePath;
  }

  log(message: string): void {
    console.log(`Writing to ${this.filePath}: ${this.formatMessage(message)}`);
  }
}

// Interfaces as Abstraction
interface Exportable {
  export(): string;
}

class CSVExporter implements Exportable {
  export(): string {
    return "name,email,age\nAlice,alice@example.com,30";
  }
}

class JSONExporter implements Exportable {
  export(): string {
    return '{"name": "Alice", "email": "alice@example.com"}';
  }
}

class DatabaseClient {
  private maxConnections: number;
  private retryAttempts: number;

  constructor(maxConnections: number, retryAttempts: number) {
    this.maxConnections = maxConnections;
    this.retryAttempts = retryAttempts;
  }

  // Clean public API: the caller's view
  connect(host: string, port: number): void {
    this.openSocket(host, port);
    this.authenticate();
    this.initializeConnectionPool();
  }

  query(sql: string): string {
    const parsedQuery = this.parseQuery(sql);
    return this.executeWithRetry(parsedQuery);
  }

  // Hidden complexity: the implementation details
  private openSocket(host: string, port: number): void {}
  private authenticate(): void {}
  private initializeConnectionPool(): void {}
  private parseQuery(sql: string): string {
    return sql.trim();
  }
  private executeWithRetry(query: string): string {
    for (let i = 0; i < this.retryAttempts; i++) {
      try {
        return this.executeQuery(query);
      } catch (e) {
        if (i === this.retryAttempts - 1) throw e;
      }
    }
    return "";
  }
  private executeQuery(query: string): string {
    return "result";
  }
}

const db = new DatabaseClient(10, 3);
db.connect("localhost", 5432);
const result = db.query("SELECT * FROM users");

abstract class MediaPlayer {
  protected playerName: string;

  constructor(playerName: string) {
    this.playerName = playerName;
  }

  abstract play(): void;
  abstract pause(): void;
  abstract stop(): void;

  displayStatus(): void {
    console.log(`[${this.playerName}] Status: Ready`);
  }

  logAction(action: string): void {
    console.log(`[${this.playerName}] Action: ${action}`);
  }
}

class AudioPlayer extends MediaPlayer {
  private audioFile: string;

  constructor(audioFile: string) {
    super("AudioPlayer");
    this.audioFile = audioFile;
  }

  play(): void {
    this.logAction(`Playing audio: ${this.audioFile}`);
  }
  pause(): void {
    this.logAction(`Paused audio: ${this.audioFile}`);
  }
  stop(): void {
    this.logAction(`Stopped audio: ${this.audioFile}`);
  }
}

class VideoPlayer extends MediaPlayer {
  private videoFile: string;
  private resolution: string;

  constructor(videoFile: string, resolution: string) {
    super("VideoPlayer");
    this.videoFile = videoFile;
    this.resolution = resolution;
  }

  play(): void {
    this.logAction(`Playing video: ${this.videoFile} at ${this.resolution}`);
  }
  pause(): void {
    this.logAction(`Paused video: ${this.videoFile}`);
  }
  stop(): void {
    this.logAction(`Stopped video: ${this.videoFile}`);
  }
}

class StreamingPlayer extends MediaPlayer {
  private streamUrl: string;
  private bufferSize: number;

  constructor(streamUrl: string, bufferSize: number) {
    super("StreamingPlayer");
    this.streamUrl = streamUrl;
    this.bufferSize = bufferSize;
  }

  play(): void {
    this.logAction(
      `Streaming from: ${this.streamUrl} (buffer: ${this.bufferSize}KB)`,
    );
  }
  pause(): void {
    this.logAction(`Paused stream: ${this.streamUrl}`);
  }
  stop(): void {
    this.logAction(`Stopped stream: ${this.streamUrl}`);
  }
}

class PlayerController {
  private player: MediaPlayer;

  constructor(player: MediaPlayer) {
    this.player = player;
  }

  startPlayback(): void {
    this.player.displayStatus();
    this.player.play();
  }
  pausePlayback(): void {
    this.player.pause();
  }
  stopPlayback(): void {
    this.player.stop();
  }
}

const audioCtrl = new PlayerController(new AudioPlayer("song.mp3"));
audioCtrl.startPlayback();
audioCtrl.pausePlayback();

console.log();

const videoCtrl = new PlayerController(new VideoPlayer("movie.mp4", "1080p"));
videoCtrl.startPlayback();
videoCtrl.stopPlayback();

console.log();

const streamCtrl = new PlayerController(
  new StreamingPlayer("https://stream.example.com/live", 2048),
);
streamCtrl.startPlayback();
streamCtrl.stopPlayback();
