import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

interface Anime {
  id: number;
  title: string;
  image: string;
  rating: number;
  episodes: number;
  genres: string[];
  description: string;
  year: number;
  status: string;
  popularDub?: string;
}

type WatchStatus = 'watching' | 'completed' | 'planned' | 'dropped' | 'on-hold';

interface UserAnimeList {
  [key: number]: WatchStatus;
}

const animeData: Anime[] = [
  {
    id: 1,
    title: "Небесный Меч",
    image: "https://cdn.poehali.dev/projects/e7346c9b-3751-4264-976f-9cf02e68ea90/files/3f30791a-6476-4b2e-888c-be4cd6c555c5.jpg",
    rating: 9.2,
    episodes: 24,
    genres: ["Фэнтези", "Приключения", "Боевик", "Сёнен"],
    description: "Эпическая история о герое с магическими способностями, который должен спасти мир от темных сил.",
    year: 2024,
    status: "ongoing",
    popularDub: "AniLibria"
  },
  {
    id: 2,
    title: "Школьные Дни",
    image: "https://cdn.poehali.dev/projects/e7346c9b-3751-4264-976f-9cf02e68ea90/files/32d9b206-0a9d-48a5-8871-458ff6eda601.jpg",
    rating: 8.5,
    episodes: 12,
    genres: ["Повседневность", "Комедия", "Школа", "Сёдзё"],
    description: "Веселые истории из жизни школьников, их дружба и повседневные приключения.",
    year: 2024,
    status: "ongoing",
    popularDub: "AniDub"
  },
  {
    id: 3,
    title: "Неоновый Город",
    image: "https://cdn.poehali.dev/projects/e7346c9b-3751-4264-976f-9cf02e68ea90/files/928e2800-9c9f-42a6-9073-ed5c85132361.jpg",
    rating: 9.5,
    episodes: 24,
    genres: ["Киберпанк", "Боевик", "Sci-Fi", "Триллер"],
    description: "В футуристическом мегаполисе разворачивается история о борьбе за свободу в мире высоких технологий.",
    year: 2024,
    status: "ongoing",
    popularDub: "SHIZA Project (субтитры)"
  },
  {
    id: 4,
    title: "Сердца в цвету",
    image: "https://cdn.poehali.dev/projects/e7346c9b-3751-4264-976f-9cf02e68ea90/files/bf552791-9c37-4595-b12a-61b901ba482b.jpg",
    rating: 8.8,
    episodes: 24,
    genres: ["Романтика", "Драма", "Сёдзё", "Школа"],
    description: "Трогательная история любви двух старшеклассников, которые учатся преодолевать жизненные трудности вместе.",
    year: 2023,
    status: "completed",
    popularDub: "AniLibria"
  },
  {
    id: 5,
    title: "Тени Прошлого",
    image: "https://cdn.poehali.dev/projects/e7346c9b-3751-4264-976f-9cf02e68ea90/files/6b70a875-0940-4f99-9d03-c5fdb932c1af.jpg",
    rating: 9.0,
    episodes: 12,
    genres: ["Ужасы", "Мистика", "Психологическое", "Сверхъестественное"],
    description: "Мрачная история о группе друзей, столкнувшихся с паранормальными явлениями в заброшенной школе.",
    year: 2024,
    status: "ongoing",
    popularDub: "AniDub"
  },
  {
    id: 6,
    title: "Путь к Победе",
    image: "https://cdn.poehali.dev/projects/e7346c9b-3751-4264-976f-9cf02e68ea90/files/26d1f5f0-ec37-495c-91d1-8efb7ea69f2c.jpg",
    rating: 8.9,
    episodes: 25,
    genres: ["Спорт", "Сёнен", "Драма", "Школа"],
    description: "Вдохновляющая история баскетбольной команды, стремящейся стать чемпионами страны.",
    year: 2024,
    status: "ongoing",
    popularDub: "AniLibria"
  }
];

const Index = () => {
  const [selectedAnime, setSelectedAnime] = useState<Anime | null>(null);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState<string>('all');
  const [userAnimeList, setUserAnimeList] = useState<UserAnimeList>({
    1: 'watching',
    2: 'completed',
  });
  const [showUserListDialog, setShowUserListDialog] = useState(false);
  const [userListFilter, setUserListFilter] = useState<WatchStatus | 'all'>('all');

  const toggleFavorite = (id: number) => {
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(fav => fav !== id) : [...prev, id]
    );
  };

  const updateAnimeStatus = (animeId: number, status: WatchStatus) => {
    setUserAnimeList(prev => ({
      ...prev,
      [animeId]: status
    }));
  };

  const removeFromList = (animeId: number) => {
    setUserAnimeList(prev => {
      const newList = { ...prev };
      delete newList[animeId];
      return newList;
    });
  };

  const getStatusLabel = (status: WatchStatus) => {
    const labels: Record<WatchStatus, string> = {
      'watching': 'Смотрю',
      'completed': 'Просмотрено',
      'planned': 'Запланировано',
      'dropped': 'Брошено',
      'on-hold': 'Отложено'
    };
    return labels[status];
  };

  const getStatusColor = (status: WatchStatus) => {
    const colors: Record<WatchStatus, string> = {
      'watching': 'bg-blue-500',
      'completed': 'bg-green-500',
      'planned': 'bg-purple-500',
      'dropped': 'bg-red-500',
      'on-hold': 'bg-yellow-500'
    };
    return colors[status];
  };

  const getUserAnimeByStatus = () => {
    if (userListFilter === 'all') {
      return Object.entries(userAnimeList);
    }
    return Object.entries(userAnimeList).filter(([_, status]) => status === userListFilter);
  };

  const getStatusCount = (status: WatchStatus) => {
    return Object.values(userAnimeList).filter(s => s === status).length;
  };

  const calculateWatchTime = () => {
    const completedAnimeIds = Object.entries(userAnimeList)
      .filter(([_, status]) => status === 'completed')
      .map(([id]) => parseInt(id));
    
    const totalEpisodes = completedAnimeIds.reduce((sum, animeId) => {
      const anime = animeData.find(a => a.id === animeId);
      return sum + (anime?.episodes || 0);
    }, 0);
    
    const totalMinutes = totalEpisodes * 24;
    const hours = Math.floor(totalMinutes / 60);
    const days = Math.floor(hours / 24);
    
    return { hours, days, episodes: totalEpisodes };
  };

  const getAnimeWatchTime = (episodes: number) => {
    const totalMinutes = episodes * 24;
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    
    if (hours > 0) {
      return `${hours} ч ${minutes} мин`;
    }
    return `${minutes} мин`;
  };

  const allGenres = Array.from(new Set(animeData.flatMap(anime => anime.genres)));

  const filteredAnime = animeData.filter(anime => {
    const matchesSearch = anime.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesGenre = selectedGenre === 'all' || anime.genres.includes(selectedGenre);
    return matchesSearch && matchesGenre;
  });

  const featuredAnime = animeData[0];

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-8">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">
                AnimeHub
              </h1>
              <nav className="hidden md:flex gap-6">
                <Button variant="ghost" className="text-foreground/80 hover:text-foreground">
                  Главная
                </Button>
                <Button variant="ghost" className="text-foreground/80 hover:text-foreground">
                  Каталог
                </Button>
                <Button variant="ghost" className="text-foreground/80 hover:text-foreground">
                  Жанры
                </Button>
                <Button variant="ghost" className="text-foreground/80 hover:text-foreground">
                  Новинки
                </Button>
              </nav>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon">
                <Icon name="Search" size={20} />
              </Button>
              <Button variant="ghost" size="icon">
                <Icon name="Heart" size={20} />
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="relative">
                    <Icon name="User" size={20} />
                    {Object.keys(userAnimeList).length > 0 && (
                      <span className="absolute -top-1 -right-1 bg-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                        {Object.keys(userAnimeList).length}
                      </span>
                    )}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-64">
                  <DropdownMenuLabel>Мой профиль</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => setShowUserListDialog(true)} className="cursor-pointer">
                    <Icon name="Library" size={18} className="mr-2" />
                    <div className="flex-1">
                      <div className="font-medium">Мой список</div>
                      <div className="text-xs text-muted-foreground">{Object.keys(userAnimeList).length} аниме</div>
                    </div>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="cursor-pointer">
                    <Icon name="Settings" size={18} className="mr-2" />
                    Настройки
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer">
                    <Icon name="LogOut" size={18} className="mr-2" />
                    Выйти
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <section className="relative mb-12 overflow-hidden rounded-2xl fade-in">
          <div className="relative h-[500px]">
            <img 
              src={featuredAnime.image} 
              alt={featuredAnime.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-12">
              <div className="max-w-2xl">
                <Badge className="mb-4 bg-primary/20 text-primary border-primary/30">
                  ⭐ Популярное
                </Badge>
                <h2 className="text-5xl font-bold mb-4">{featuredAnime.title}</h2>
                <p className="text-lg text-foreground/80 mb-6">
                  {featuredAnime.description}
                </p>
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex items-center gap-2">
                    <Icon name="Star" className="text-yellow-400" size={20} />
                    <span className="font-semibold">{featuredAnime.rating}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Icon name="Calendar" size={20} />
                    <span>{featuredAnime.year}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Icon name="Film" size={20} />
                    <span>{featuredAnime.episodes} серий</span>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Button 
                    size="lg" 
                    className="bg-primary hover:bg-primary/90"
                    onClick={() => setSelectedAnime(featuredAnime)}
                  >
                    <Icon name="Play" size={20} className="mr-2" />
                    Смотреть
                  </Button>
                  <Button 
                    size="lg" 
                    variant="outline"
                    onClick={() => toggleFavorite(featuredAnime.id)}
                  >
                    <Icon 
                      name={favorites.includes(featuredAnime.id) ? "Heart" : "Heart"} 
                      size={20} 
                      className={favorites.includes(featuredAnime.id) ? "fill-current" : ""}
                    />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1">
              <Input
                placeholder="Поиск аниме..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-12"
              />
            </div>
            <Select value={selectedGenre} onValueChange={setSelectedGenre}>
              <SelectTrigger className="w-full md:w-48 h-12">
                <SelectValue placeholder="Все жанры" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Все жанры</SelectItem>
                {allGenres.map(genre => (
                  <SelectItem key={genre} value={genre}>{genre}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Tabs defaultValue="all" className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="all">Все</TabsTrigger>
              <TabsTrigger value="trending">Популярное</TabsTrigger>
              <TabsTrigger value="new">Новинки</TabsTrigger>
              <TabsTrigger value="top-year">Топ года</TabsTrigger>
              <TabsTrigger value="top-month">Топ месяца</TabsTrigger>
              <TabsTrigger value="genres">Жанры</TabsTrigger>
              <TabsTrigger value="favorites">Избранное</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredAnime.map((anime, index) => (
                  <Card 
                    key={anime.id} 
                    className="group overflow-hidden border-0 bg-card hover:shadow-xl transition-all duration-300 hover-scale cursor-pointer fade-in"
                    style={{ animationDelay: `${index * 0.1}s` }}
                    onClick={() => setSelectedAnime(anime)}
                  >
                    <div className="relative aspect-[2/3] overflow-hidden">
                      <img 
                        src={anime.image} 
                        alt={anime.title}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                      <div className="absolute top-3 right-3">
                        <Button
                          size="icon"
                          variant="secondary"
                          className="rounded-full bg-background/80 backdrop-blur hover:bg-background"
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleFavorite(anime.id);
                          }}
                        >
                          <Icon 
                            name="Heart" 
                            size={18}
                            className={favorites.includes(anime.id) ? "fill-primary text-primary" : ""}
                          />
                        </Button>
                      </div>
                      <div className="absolute top-3 left-3">
                        <Badge className="bg-primary/90 backdrop-blur">
                          <Icon name="Star" size={14} className="mr-1" />
                          {anime.rating}
                        </Badge>
                      </div>
                      {anime.status === 'ongoing' && (
                        <div className="absolute bottom-3 left-3">
                          <Badge variant="secondary" className="bg-green-500/90 text-white backdrop-blur">
                            Онгоинг
                          </Badge>
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-lg mb-2 line-clamp-1">{anime.title}</h3>
                      <div className="flex flex-wrap gap-1 mb-3">
                        {anime.genres.slice(0, 2).map(genre => (
                          <Badge key={genre} variant="outline" className="text-xs">
                            {genre}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Icon name="Film" size={14} />
                          {anime.episodes} серий
                        </span>
                        <span>{anime.year}</span>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="trending">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredAnime.filter(a => a.rating >= 9).map((anime, index) => (
                  <Card 
                    key={anime.id} 
                    className="group overflow-hidden border-0 bg-card hover:shadow-xl transition-all duration-300 hover-scale cursor-pointer fade-in"
                    style={{ animationDelay: `${index * 0.1}s` }}
                    onClick={() => setSelectedAnime(anime)}
                  >
                    <div className="relative aspect-[2/3] overflow-hidden">
                      <img 
                        src={anime.image} 
                        alt={anime.title}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                      <div className="absolute top-3 right-3">
                        <Button
                          size="icon"
                          variant="secondary"
                          className="rounded-full bg-background/80 backdrop-blur hover:bg-background"
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleFavorite(anime.id);
                          }}
                        >
                          <Icon 
                            name="Heart" 
                            size={18}
                            className={favorites.includes(anime.id) ? "fill-primary text-primary" : ""}
                          />
                        </Button>
                      </div>
                      <div className="absolute top-3 left-3">
                        <Badge className="bg-primary/90 backdrop-blur">
                          <Icon name="Star" size={14} className="mr-1" />
                          {anime.rating}
                        </Badge>
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-lg mb-2 line-clamp-1">{anime.title}</h3>
                      <div className="flex flex-wrap gap-1 mb-3">
                        {anime.genres.slice(0, 2).map(genre => (
                          <Badge key={genre} variant="outline" className="text-xs">
                            {genre}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Icon name="Film" size={14} />
                          {anime.episodes} серий
                        </span>
                        <span>{anime.year}</span>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="new">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredAnime.filter(a => a.year === 2024).map((anime, index) => (
                  <Card 
                    key={anime.id} 
                    className="group overflow-hidden border-0 bg-card hover:shadow-xl transition-all duration-300 hover-scale cursor-pointer fade-in"
                    style={{ animationDelay: `${index * 0.1}s` }}
                    onClick={() => setSelectedAnime(anime)}
                  >
                    <div className="relative aspect-[2/3] overflow-hidden">
                      <img 
                        src={anime.image} 
                        alt={anime.title}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                      <div className="absolute top-3 right-3">
                        <Button
                          size="icon"
                          variant="secondary"
                          className="rounded-full bg-background/80 backdrop-blur hover:bg-background"
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleFavorite(anime.id);
                          }}
                        >
                          <Icon 
                            name="Heart" 
                            size={18}
                            className={favorites.includes(anime.id) ? "fill-primary text-primary" : ""}
                          />
                        </Button>
                      </div>
                      <div className="absolute top-3 left-3">
                        <Badge className="bg-primary/90 backdrop-blur">
                          <Icon name="Star" size={14} className="mr-1" />
                          {anime.rating}
                        </Badge>
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-lg mb-2 line-clamp-1">{anime.title}</h3>
                      <div className="flex flex-wrap gap-1 mb-3">
                        {anime.genres.slice(0, 2).map(genre => (
                          <Badge key={genre} variant="outline" className="text-xs">
                            {genre}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Icon name="Film" size={14} />
                          {anime.episodes} серий
                        </span>
                        <span>{anime.year}</span>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="top-year">
              <div className="mb-6">
                <h3 className="text-2xl font-bold mb-2">🏆 Лучшие аниме 2024 года</h3>
                <p className="text-muted-foreground">Самые высокооценённые аниме этого года</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredAnime
                  .filter(a => a.year === 2024)
                  .sort((a, b) => b.rating - a.rating)
                  .map((anime, index) => (
                  <Card 
                    key={anime.id} 
                    className="group overflow-hidden border-0 bg-card hover:shadow-xl transition-all duration-300 hover-scale cursor-pointer fade-in relative"
                    style={{ animationDelay: `${index * 0.1}s` }}
                    onClick={() => setSelectedAnime(anime)}
                  >
                    <div className="relative aspect-[2/3] overflow-hidden">
                      <img 
                        src={anime.image} 
                        alt={anime.title}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                      {index < 3 && (
                        <div className="absolute top-3 left-3 z-10">
                          <Badge className={`text-lg font-bold ${
                            index === 0 ? 'bg-yellow-500' : 
                            index === 1 ? 'bg-gray-400' : 
                            'bg-amber-600'
                          }`}>
                            #{index + 1}
                          </Badge>
                        </div>
                      )}
                      <div className="absolute top-3 right-3">
                        <Button
                          size="icon"
                          variant="secondary"
                          className="rounded-full bg-background/80 backdrop-blur hover:bg-background"
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleFavorite(anime.id);
                          }}
                        >
                          <Icon 
                            name="Heart" 
                            size={18}
                            className={favorites.includes(anime.id) ? "fill-primary text-primary" : ""}
                          />
                        </Button>
                      </div>
                      <div className="absolute bottom-3 left-3">
                        <Badge className="bg-primary/90 backdrop-blur">
                          <Icon name="Star" size={14} className="mr-1" />
                          {anime.rating}
                        </Badge>
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-lg mb-2 line-clamp-1">{anime.title}</h3>
                      <div className="flex flex-wrap gap-1 mb-3">
                        {anime.genres.slice(0, 2).map(genre => (
                          <Badge key={genre} variant="outline" className="text-xs">
                            {genre}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Icon name="Film" size={14} />
                          {anime.episodes} серий
                        </span>
                        <span>{anime.year}</span>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="top-month">
              <div className="mb-6">
                <h3 className="text-2xl font-bold mb-2">🔥 Топ октября 2024</h3>
                <p className="text-muted-foreground">Самые популярные аниме этого месяца</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredAnime
                  .filter(a => a.status === 'ongoing')
                  .sort((a, b) => b.rating - a.rating)
                  .map((anime, index) => (
                  <Card 
                    key={anime.id} 
                    className="group overflow-hidden border-0 bg-card hover:shadow-xl transition-all duration-300 hover-scale cursor-pointer fade-in relative"
                    style={{ animationDelay: `${index * 0.1}s` }}
                    onClick={() => setSelectedAnime(anime)}
                  >
                    <div className="relative aspect-[2/3] overflow-hidden">
                      <img 
                        src={anime.image} 
                        alt={anime.title}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                      {index < 3 && (
                        <div className="absolute top-3 left-3 z-10">
                          <Badge className={`text-lg font-bold ${
                            index === 0 ? 'bg-yellow-500' : 
                            index === 1 ? 'bg-gray-400' : 
                            'bg-amber-600'
                          }`}>
                            #{index + 1}
                          </Badge>
                        </div>
                      )}
                      <div className="absolute top-3 right-3">
                        <Button
                          size="icon"
                          variant="secondary"
                          className="rounded-full bg-background/80 backdrop-blur hover:bg-background"
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleFavorite(anime.id);
                          }}
                        >
                          <Icon 
                            name="Heart" 
                            size={18}
                            className={favorites.includes(anime.id) ? "fill-primary text-primary" : ""}
                          />
                        </Button>
                      </div>
                      <div className="absolute bottom-3 left-3">
                        <Badge className="bg-primary/90 backdrop-blur">
                          <Icon name="Star" size={14} className="mr-1" />
                          {anime.rating}
                        </Badge>
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-lg mb-2 line-clamp-1">{anime.title}</h3>
                      <div className="flex flex-wrap gap-1 mb-3">
                        {anime.genres.slice(0, 2).map(genre => (
                          <Badge key={genre} variant="outline" className="text-xs">
                            {genre}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Icon name="Film" size={14} />
                          {anime.episodes} серий
                        </span>
                        <span>{anime.year}</span>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="genres">
              <div className="space-y-6">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                  {allGenres.map((genre) => {
                    const genreAnime = animeData.filter(a => a.genres.includes(genre));
                    const genreIcons: Record<string, string> = {
                      'Боевик': 'Swords',
                      'Приключения': 'Compass',
                      'Фэнтези': 'Wand2',
                      'Романтика': 'Heart',
                      'Комедия': 'Laugh',
                      'Драма': 'Drama',
                      'Школа': 'School',
                      'Спорт': 'Trophy',
                      'Sci-Fi': 'Rocket',
                      'Киберпанк': 'Cpu',
                      'Ужасы': 'Ghost',
                      'Мистика': 'Eye',
                      'Психологическое': 'Brain',
                      'Сверхъестественное': 'Sparkles',
                      'Повседневность': 'Coffee',
                      'Сёнен': 'Zap',
                      'Сёдзё': 'Flower2',
                      'Триллер': 'AlertTriangle'
                    };
                    
                    return (
                      <Card 
                        key={genre}
                        className="group relative overflow-hidden cursor-pointer hover-scale transition-all duration-300 hover:shadow-xl"
                        onClick={() => {
                          setSelectedGenre(genre);
                          document.querySelector('[value="all"]')?.scrollIntoView({ behavior: 'smooth' });
                        }}
                      >
                        <div className="aspect-square relative">
                          {genreAnime[0] && (
                            <>
                              <img 
                                src={genreAnime[0].image} 
                                alt={genre}
                                className="w-full h-full object-cover"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                            </>
                          )}
                          <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
                            <Icon 
                              name={genreIcons[genre] || 'Tag'} 
                              size={32} 
                              className="text-white mb-2 drop-shadow-lg"
                            />
                            <h3 className="font-bold text-white text-center text-lg drop-shadow-lg">
                              {genre}
                            </h3>
                            <p className="text-xs text-white/90 mt-1 drop-shadow">
                              {genreAnime.length} аниме
                            </p>
                          </div>
                        </div>
                      </Card>
                    );
                  })}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="favorites">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {favorites.length === 0 ? (
                  <div className="col-span-full text-center py-12">
                    <Icon name="Heart" size={48} className="mx-auto mb-4 text-muted-foreground" />
                    <p className="text-lg text-muted-foreground">Избранное пусто</p>
                    <p className="text-sm text-muted-foreground mt-2">Добавьте аниме в избранное, чтобы быстро находить их</p>
                  </div>
                ) : (
                  filteredAnime.filter(a => favorites.includes(a.id)).map((anime, index) => (
                    <Card 
                      key={anime.id} 
                      className="group overflow-hidden border-0 bg-card hover:shadow-xl transition-all duration-300 hover-scale cursor-pointer fade-in"
                      style={{ animationDelay: `${index * 0.1}s` }}
                      onClick={() => setSelectedAnime(anime)}
                    >
                      <div className="relative aspect-[2/3] overflow-hidden">
                        <img 
                          src={anime.image} 
                          alt={anime.title}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                        />
                        <div className="absolute top-3 right-3">
                          <Button
                            size="icon"
                            variant="secondary"
                            className="rounded-full bg-background/80 backdrop-blur hover:bg-background"
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleFavorite(anime.id);
                            }}
                          >
                            <Icon 
                              name="Heart" 
                              size={18}
                              className="fill-primary text-primary"
                            />
                          </Button>
                        </div>
                        <div className="absolute top-3 left-3">
                          <Badge className="bg-primary/90 backdrop-blur">
                            <Icon name="Star" size={14} className="mr-1" />
                            {anime.rating}
                          </Badge>
                        </div>
                      </div>
                      <div className="p-4">
                        <h3 className="font-semibold text-lg mb-2 line-clamp-1">{anime.title}</h3>
                        <div className="flex flex-wrap gap-1 mb-3">
                          {anime.genres.slice(0, 2).map(genre => (
                            <Badge key={genre} variant="outline" className="text-xs">
                              {genre}
                            </Badge>
                          ))}
                        </div>
                        <div className="flex items-center justify-between text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Icon name="Film" size={14} />
                            {anime.episodes} серий
                          </span>
                          <span>{anime.year}</span>
                        </div>
                      </div>
                    </Card>
                  ))
                )}
              </div>
            </TabsContent>
          </Tabs>
        </section>
      </main>

      <Dialog open={!!selectedAnime} onOpenChange={() => setSelectedAnime(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          {selectedAnime && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl">{selectedAnime.title}</DialogTitle>
              </DialogHeader>
              <div className="space-y-6">
                <div className="aspect-video bg-black rounded-lg flex items-center justify-center relative overflow-hidden">
                  <img 
                    src={selectedAnime.image} 
                    alt={selectedAnime.title}
                    className="w-full h-full object-cover opacity-40"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Button size="lg" className="rounded-full w-16 h-16">
                      <Icon name="Play" size={32} />
                    </Button>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-4 flex-wrap">
                    <div className="flex items-center gap-2">
                      <Icon name="Star" className="text-yellow-400" size={20} />
                      <span className="font-semibold">{selectedAnime.rating}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Icon name="Calendar" size={20} />
                      <span>{selectedAnime.year}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Icon name="Film" size={20} />
                      <span>{selectedAnime.episodes} серий</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Icon name="Clock" size={20} className="text-primary" />
                      <span className="font-semibold">{getAnimeWatchTime(selectedAnime.episodes)}</span>
                    </div>
                    <Badge variant={selectedAnime.status === 'ongoing' ? 'default' : 'secondary'}>
                      {selectedAnime.status === 'ongoing' ? 'Онгоинг' : 'Завершено'}
                    </Badge>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">Описание</h4>
                    <p className="text-muted-foreground">{selectedAnime.description}</p>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">Жанры</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedAnime.genres.map(genre => (
                        <Badge key={genre} variant="outline">{genre}</Badge>
                      ))}
                    </div>
                  </div>

                  {selectedAnime.popularDub && (
                    <div className="p-3 bg-primary/10 rounded-lg border border-primary/20">
                      <div className="flex items-center gap-2">
                        <Icon name="TrendingUp" size={18} className="text-primary" />
                        <span className="text-sm">
                          <span className="text-muted-foreground">Чаще всего смотрят в озвучке:</span>
                          {' '}
                          <span className="font-semibold text-foreground">{selectedAnime.popularDub}</span>
                        </span>
                      </div>
                    </div>
                  )}

                  <div>
                    <h4 className="font-semibold mb-3">Выбор озвучки</h4>
                    <Select defaultValue="studio1">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="studio1">AniLibria (озвучка)</SelectItem>
                        <SelectItem value="studio2">AniDub (многоголосая озвучка)</SelectItem>
                        <SelectItem value="studio3">Субтитры (оригинал)</SelectItem>
                        <SelectItem value="studio4">SHIZA Project (субтитры)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-3">Качество видео</h4>
                    <Select defaultValue="1080p">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1080p">1080p (Full HD)</SelectItem>
                        <SelectItem value="720p">720p (HD)</SelectItem>
                        <SelectItem value="480p">480p (SD)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex gap-3 pt-4">
                    <Button className="flex-1" size="lg">
                      <Icon name="Play" size={20} className="mr-2" />
                      Смотреть
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="lg">
                          <Icon name="Plus" size={20} />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuLabel>Добавить в список</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => updateAnimeStatus(selectedAnime.id, 'watching')}>
                          <Icon name="Eye" size={16} className="mr-2" />
                          Смотрю
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => updateAnimeStatus(selectedAnime.id, 'completed')}>
                          <Icon name="Check" size={16} className="mr-2" />
                          Просмотрено
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => updateAnimeStatus(selectedAnime.id, 'planned')}>
                          <Icon name="Clock" size={16} className="mr-2" />
                          Запланировано
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => updateAnimeStatus(selectedAnime.id, 'on-hold')}>
                          <Icon name="Pause" size={16} className="mr-2" />
                          Отложено
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => updateAnimeStatus(selectedAnime.id, 'dropped')}>
                          <Icon name="X" size={16} className="mr-2" />
                          Брошено
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                    <Button 
                      variant="outline" 
                      size="lg"
                      onClick={() => toggleFavorite(selectedAnime.id)}
                    >
                      <Icon 
                        name="Heart" 
                        size={20}
                        className={favorites.includes(selectedAnime.id) ? "fill-primary text-primary" : ""}
                      />
                    </Button>
                    <Button variant="outline" size="lg">
                      <Icon name="Share2" size={20} />
                    </Button>
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={showUserListDialog} onOpenChange={setShowUserListDialog}>
        <DialogContent className="max-w-5xl max-h-[90vh] overflow-hidden flex flex-col">
          <DialogHeader>
            <DialogTitle className="text-2xl">Мой список аниме</DialogTitle>
          </DialogHeader>
          
          <div className="mb-6 p-4 bg-gradient-to-r from-primary/10 to-purple-500/10 rounded-lg border border-primary/20">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="space-y-1">
                <h3 className="text-lg font-semibold">Статистика просмотра</h3>
                <div className="flex items-center gap-6 text-sm flex-wrap">
                  <div className="flex items-center gap-2">
                    <Icon name="Clock" size={16} className="text-primary" />
                    <span className="text-muted-foreground">Время:</span>
                    <span className="font-bold text-foreground">{calculateWatchTime().hours} ч</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Icon name="Calendar" size={16} className="text-primary" />
                    <span className="text-muted-foreground">Дней:</span>
                    <span className="font-bold text-foreground">{calculateWatchTime().days}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Icon name="Film" size={16} className="text-primary" />
                    <span className="text-muted-foreground">Серий:</span>
                    <span className="font-bold text-foreground">{calculateWatchTime().episodes}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-2 mb-4 flex-wrap">
            <Button 
              variant={userListFilter === 'all' ? 'default' : 'outline'} 
              size="sm"
              onClick={() => setUserListFilter('all')}
            >
              Все ({Object.keys(userAnimeList).length})
            </Button>
            <Button 
              variant={userListFilter === 'watching' ? 'default' : 'outline'} 
              size="sm"
              onClick={() => setUserListFilter('watching')}
            >
              Смотрю ({getStatusCount('watching')})
            </Button>
            <Button 
              variant={userListFilter === 'completed' ? 'default' : 'outline'} 
              size="sm"
              onClick={() => setUserListFilter('completed')}
            >
              Просмотрено ({getStatusCount('completed')})
            </Button>
            <Button 
              variant={userListFilter === 'planned' ? 'default' : 'outline'} 
              size="sm"
              onClick={() => setUserListFilter('planned')}
            >
              Запланировано ({getStatusCount('planned')})
            </Button>
            <Button 
              variant={userListFilter === 'on-hold' ? 'default' : 'outline'} 
              size="sm"
              onClick={() => setUserListFilter('on-hold')}
            >
              Отложено ({getStatusCount('on-hold')})
            </Button>
            <Button 
              variant={userListFilter === 'dropped' ? 'default' : 'outline'} 
              size="sm"
              onClick={() => setUserListFilter('dropped')}
            >
              Брошено ({getStatusCount('dropped')})
            </Button>
          </div>

          <div className="flex-1 overflow-y-auto">
            {getUserAnimeByStatus().length === 0 ? (
              <div className="text-center py-12">
                <Icon name="Library" size={48} className="mx-auto mb-4 text-muted-foreground" />
                <p className="text-lg text-muted-foreground">Список пуст</p>
                <p className="text-sm text-muted-foreground mt-2">Добавьте аниме в свой список</p>
              </div>
            ) : (
              <div className="grid gap-4">
                {getUserAnimeByStatus().map(([animeIdStr, status]) => {
                  const animeId = parseInt(animeIdStr);
                  const anime = animeData.find(a => a.id === animeId);
                  if (!anime) return null;
                  
                  return (
                    <Card key={animeId} className="p-4 hover:shadow-lg transition-shadow">
                      <div className="flex gap-4">
                        <img 
                          src={anime.image} 
                          alt={anime.title}
                          className="w-24 h-36 object-cover rounded-lg cursor-pointer hover-scale"
                          onClick={() => {
                            setSelectedAnime(anime);
                            setShowUserListDialog(false);
                          }}
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2 mb-2">
                            <h3 
                              className="font-semibold text-lg cursor-pointer hover:text-primary transition-colors"
                              onClick={() => {
                                setSelectedAnime(anime);
                                setShowUserListDialog(false);
                              }}
                            >
                              {anime.title}
                            </h3>
                            <Badge className={`${getStatusColor(status)} text-white shrink-0`}>
                              {getStatusLabel(status)}
                            </Badge>
                          </div>
                          <div className="flex flex-wrap gap-2 mb-3">
                            {anime.genres.map(genre => (
                              <Badge key={genre} variant="outline" className="text-xs">
                                {genre}
                              </Badge>
                            ))}
                          </div>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                            <span className="flex items-center gap-1">
                              <Icon name="Star" className="text-yellow-400" size={14} />
                              {anime.rating}
                            </span>
                            <span className="flex items-center gap-1">
                              <Icon name="Film" size={14} />
                              {anime.episodes} серий
                            </span>
                            <span>{anime.year}</span>
                          </div>
                          <div className="flex gap-2">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button size="sm" variant="outline">
                                  <Icon name="Edit" size={14} className="mr-1" />
                                  Изменить статус
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent>
                                <DropdownMenuItem onClick={() => updateAnimeStatus(animeId, 'watching')}>
                                  <Icon name="Eye" size={16} className="mr-2" />
                                  Смотрю
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => updateAnimeStatus(animeId, 'completed')}>
                                  <Icon name="Check" size={16} className="mr-2" />
                                  Просмотрено
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => updateAnimeStatus(animeId, 'planned')}>
                                  <Icon name="Clock" size={16} className="mr-2" />
                                  Запланировано
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => updateAnimeStatus(animeId, 'on-hold')}>
                                  <Icon name="Pause" size={16} className="mr-2" />
                                  Отложено
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => updateAnimeStatus(animeId, 'dropped')}>
                                  <Icon name="X" size={16} className="mr-2" />
                                  Брошено
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => removeFromList(animeId)}
                            >
                              <Icon name="Trash2" size={14} className="mr-1" />
                              Удалить
                            </Button>
                          </div>
                        </div>
                      </div>
                    </Card>
                  );
                })}
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Index;