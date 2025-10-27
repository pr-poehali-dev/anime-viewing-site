import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

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
}

const animeData: Anime[] = [
  {
    id: 1,
    title: "Небесный Меч",
    image: "https://cdn.poehali.dev/projects/e7346c9b-3751-4264-976f-9cf02e68ea90/files/3f30791a-6476-4b2e-888c-be4cd6c555c5.jpg",
    rating: 9.2,
    episodes: 24,
    genres: ["Фэнтези", "Приключения", "Боевик"],
    description: "Эпическая история о герое с магическими способностями, который должен спасти мир от темных сил.",
    year: 2024,
    status: "ongoing"
  },
  {
    id: 2,
    title: "Школьные Дни",
    image: "https://cdn.poehali.dev/projects/e7346c9b-3751-4264-976f-9cf02e68ea90/files/32d9b206-0a9d-48a5-8871-458ff6eda601.jpg",
    rating: 8.5,
    episodes: 12,
    genres: ["Повседневность", "Комедия", "Школа"],
    description: "Веселые истории из жизни школьников, их дружба и повседневные приключения.",
    year: 2024,
    status: "ongoing"
  },
  {
    id: 3,
    title: "Неоновый Город",
    image: "https://cdn.poehali.dev/projects/e7346c9b-3751-4264-976f-9cf02e68ea90/files/928e2800-9c9f-42a6-9073-ed5c85132361.jpg",
    rating: 9.5,
    episodes: 24,
    genres: ["Киберпанк", "Боевик", "Sci-Fi"],
    description: "В футуристическом мегаполисе разворачивается история о борьбе за свободу в мире высоких технологий.",
    year: 2024,
    status: "ongoing"
  }
];

const Index = () => {
  const [selectedAnime, setSelectedAnime] = useState<Anime | null>(null);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState<string>('all');

  const toggleFavorite = (id: number) => {
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(fav => fav !== id) : [...prev, id]
    );
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
              <Button variant="ghost" size="icon">
                <Icon name="User" size={20} />
              </Button>
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
                  <div className="flex items-center gap-4">
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
    </div>
  );
};

export default Index;
