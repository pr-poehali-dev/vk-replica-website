import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { ScrollArea } from '@/components/ui/scroll-area';
import Icon from '@/components/ui/icon';

interface Track {
  id: number;
  title: string;
  artist: string;
  duration: string;
  cover: string;
}

interface Playlist {
  id: number;
  name: string;
  count: number;
}

const Index = () => {
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState([75]);
  const [progress, setProgress] = useState([0]);
  const [searchQuery, setSearchQuery] = useState('');

  const tracks: Track[] = [
    { id: 1, title: 'Neon Dreams', artist: 'Synthwave Collective', duration: '3:42', cover: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=300&h=300&fit=crop' },
    { id: 2, title: 'Electric Heartbeat', artist: 'Nova Sound', duration: '4:15', cover: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop' },
    { id: 3, title: 'Midnight Groove', artist: 'Urban Beats', duration: '3:28', cover: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&h=300&fit=crop' },
    { id: 4, title: 'Crystal Waves', artist: 'Ambient Flow', duration: '5:10', cover: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=300&h=300&fit=crop' },
    { id: 5, title: 'Digital Sunrise', artist: 'Electronic Dreams', duration: '4:02', cover: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=300&h=300&fit=crop' },
    { id: 6, title: 'Velocity', artist: 'Bass Legion', duration: '3:35', cover: 'https://images.unsplash.com/photo-1487180144351-b8472da7d491?w=300&h=300&fit=crop' },
  ];

  const playlists: Playlist[] = [
    { id: 1, name: 'Избранное', count: 42 },
    { id: 2, name: 'Тренировка', count: 28 },
    { id: 3, name: 'Работа', count: 56 },
    { id: 4, name: 'Вечер', count: 31 },
  ];

  const handlePlayTrack = (track: Track) => {
    setCurrentTrack(track);
    setIsPlaying(true);
    setProgress([0]);
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const filteredTracks = tracks.filter(
    (track) =>
      track.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      track.artist.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/30 to-background">
      <div className="flex h-screen">
        <aside className="w-64 bg-card border-r border-border flex flex-col animate-slide-in">
          <div className="p-6 border-b border-border">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
                <Icon name="Music" size={24} className="text-primary-foreground" />
              </div>
              <h1 className="text-xl font-bold">Музыка</h1>
            </div>
          </div>

          <ScrollArea className="flex-1 px-3">
            <nav className="space-y-1 py-4">
              <Button variant="ghost" className="w-full justify-start gap-3 text-left hover:bg-accent">
                <Icon name="Music2" size={20} />
                Моя музыка
              </Button>
              <Button variant="ghost" className="w-full justify-start gap-3 text-left hover:bg-accent">
                <Icon name="ListMusic" size={20} />
                Плейлисты
              </Button>
              <Button variant="ghost" className="w-full justify-start gap-3 text-left hover:bg-accent">
                <Icon name="Heart" size={20} />
                Избранное
              </Button>
              <Button variant="ghost" className="w-full justify-start gap-3 text-left hover:bg-accent">
                <Icon name="Clock" size={20} />
                Недавние
              </Button>
              <Button variant="ghost" className="w-full justify-start gap-3 text-left hover:bg-accent">
                <Icon name="Radio" size={20} />
                Радио
              </Button>
            </nav>

            <div className="py-4 border-t border-border mt-4">
              <h3 className="px-3 mb-3 text-sm font-semibold text-muted-foreground">Плейлисты</h3>
              <div className="space-y-1">
                {playlists.map((playlist) => (
                  <Button
                    key={playlist.id}
                    variant="ghost"
                    className="w-full justify-between px-3 hover:bg-accent"
                  >
                    <span className="truncate">{playlist.name}</span>
                    <span className="text-xs text-muted-foreground">{playlist.count}</span>
                  </Button>
                ))}
              </div>
            </div>
          </ScrollArea>
        </aside>

        <main className="flex-1 flex flex-col overflow-hidden">
          <header className="border-b border-border bg-card/50 backdrop-blur-sm animate-fade-in">
            <div className="p-6">
              <div className="flex items-center gap-4 mb-6">
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Icon name="ChevronLeft" size={20} />
                </Button>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Icon name="ChevronRight" size={20} />
                </Button>
                <div className="flex-1 max-w-md relative">
                  <Icon name="Search" size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Поиск музыки..."
                    className="pl-10 bg-background/80"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Button variant="ghost" size="icon" className="rounded-full ml-auto">
                  <Icon name="User" size={20} />
                </Button>
              </div>
            </div>
          </header>

          <ScrollArea className="flex-1">
            <div className="p-6 animate-fade-in">
              <div className="mb-8">
                <h2 className="text-3xl font-bold mb-2">Рекомендации</h2>
                <p className="text-muted-foreground">Музыка специально для вас</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
                {filteredTracks.map((track, index) => (
                  <Card
                    key={track.id}
                    className="group overflow-hidden hover-scale cursor-pointer transition-all hover:shadow-lg"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <div className="flex items-center gap-4 p-4">
                      <div className="relative">
                        <img
                          src={track.cover}
                          alt={track.title}
                          className="w-16 h-16 rounded-lg object-cover"
                        />
                        <div className="absolute inset-0 bg-black/40 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <Button
                            size="icon"
                            className="w-10 h-10 rounded-full bg-primary hover:bg-primary/90"
                            onClick={() => handlePlayTrack(track)}
                          >
                            <Icon name={currentTrack?.id === track.id && isPlaying ? "Pause" : "Play"} size={16} className="text-primary-foreground" />
                          </Button>
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold truncate">{track.title}</h3>
                        <p className="text-sm text-muted-foreground truncate">{track.artist}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground">{track.duration}</span>
                        <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100">
                          <Icon name="MoreVertical" size={16} />
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>

              {filteredTracks.length === 0 && (
                <div className="text-center py-12">
                  <Icon name="Search" size={48} className="mx-auto text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">Ничего не найдено</p>
                </div>
              )}

              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-6">Популярные плейлисты</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { name: 'Top 50 Global', cover: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&h=300&fit=crop' },
                    { name: 'Хиты 2024', cover: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop' },
                    { name: 'Chill Vibes', cover: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=300&h=300&fit=crop' },
                    { name: 'Workout Mix', cover: 'https://images.unsplash.com/photo-1487180144351-b8472da7d491?w=300&h=300&fit=crop' },
                  ].map((playlist, index) => (
                    <Card key={index} className="group overflow-hidden hover-scale cursor-pointer">
                      <div className="relative aspect-square">
                        <img
                          src={playlist.cover}
                          alt={playlist.name}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                        <Button
                          size="icon"
                          className="absolute bottom-4 right-4 rounded-full opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all"
                        >
                          <Icon name="Play" size={16} />
                        </Button>
                      </div>
                      <div className="p-4">
                        <h3 className="font-semibold">{playlist.name}</h3>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </ScrollArea>

          {currentTrack && (
            <footer className="border-t border-border bg-card animate-slide-in">
              <div className="p-4">
                <div className="flex items-center gap-4 mb-3">
                  <img
                    src={currentTrack.cover}
                    alt={currentTrack.title}
                    className="w-14 h-14 rounded-lg object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold truncate">{currentTrack.title}</h4>
                    <p className="text-sm text-muted-foreground truncate">{currentTrack.artist}</p>
                  </div>
                  <Button variant="ghost" size="icon">
                    <Icon name="Heart" size={18} />
                  </Button>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon">
                      <Icon name="Shuffle" size={18} />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Icon name="SkipBack" size={18} />
                    </Button>
                    <Button
                      size="icon"
                      className="w-10 h-10 rounded-full"
                      onClick={togglePlay}
                    >
                      <Icon name={isPlaying ? "Pause" : "Play"} size={18} />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Icon name="SkipForward" size={18} />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Icon name="Repeat" size={18} />
                    </Button>
                  </div>
                  <div className="flex items-center gap-2">
                    <Icon name="Volume2" size={18} className="text-muted-foreground" />
                    <Slider
                      value={volume}
                      onValueChange={setVolume}
                      max={100}
                      step={1}
                      className="w-24"
                    />
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-muted-foreground w-10 text-right">
                    {Math.floor(progress[0] / 60)}:{String(Math.floor(progress[0] % 60)).padStart(2, '0')}
                  </span>
                  <Slider
                    value={progress}
                    onValueChange={setProgress}
                    max={240}
                    step={1}
                    className="flex-1"
                  />
                  <span className="text-xs text-muted-foreground w-10">{currentTrack.duration}</span>
                </div>
              </div>
            </footer>
          )}
        </main>
      </div>
    </div>
  );
};

export default Index;
