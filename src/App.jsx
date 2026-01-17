import React, { useState, useEffect } from 'react';
import { Search, Star, TrendingUp, Film, Sparkles, ArrowRight, User, Heart, Calendar, Award } from 'lucide-react';

const MovieRecommendationSystem = () => {
  const [step, setStep] = useState('onboarding'); // onboarding, discover, rated
  const [userProfile, setUserProfile] = useState({
    name: '',
    favoriteShow: '',
    favoriteGenres: [],
    favoriteActor: '',
    favoriteDirector: '',
    preferredDecade: '',
    moodPreference: ''
  });
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [userRatings, setUserRatings] = useState({});
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('discover');

  const movieDatabase = [
    { id: 1, title: "Inception", genres: ["Sci-Fi", "Thriller"], rating: 8.8, year: 2010, director: "Christopher Nolan", actors: ["Leonardo DiCaprio"], description: "A thief who steals corporate secrets through dream-sharing technology", poster: "🎬", mood: "intense" },
    { id: 2, title: "The Shawshank Redemption", genres: ["Drama"], rating: 9.3, year: 1994, director: "Frank Darabont", actors: ["Tim Robbins", "Morgan Freeman"], description: "Two imprisoned men bond over years, finding redemption", poster: "🎭", mood: "inspiring" },
    { id: 3, title: "The Dark Knight", genres: ["Action", "Crime"], rating: 9.0, year: 2008, director: "Christopher Nolan", actors: ["Christian Bale", "Heath Ledger"], description: "Batman faces the Joker in an epic battle for Gotham", poster: "🦇", mood: "intense" },
    { id: 4, title: "Pulp Fiction", genres: ["Crime", "Drama"], rating: 8.9, year: 1994, director: "Quentin Tarantino", actors: ["John Travolta", "Samuel L. Jackson"], description: "Various interconnected stories in LA's criminal underworld", poster: "🔫", mood: "edgy" },
    { id: 5, title: "Forrest Gump", genres: ["Drama", "Romance"], rating: 8.8, year: 1994, director: "Robert Zemeckis", actors: ["Tom Hanks"], description: "The journey of a simple man through American history", poster: "🏃", mood: "heartwarming" },
    { id: 6, title: "The Matrix", genres: ["Sci-Fi", "Action"], rating: 8.7, year: 1999, director: "Wachowski Brothers", actors: ["Keanu Reeves"], description: "A hacker discovers reality is a simulation", poster: "💊", mood: "intense" },
    { id: 7, title: "Interstellar", genres: ["Sci-Fi", "Drama"], rating: 8.6, year: 2014, director: "Christopher Nolan", actors: ["Matthew McConaughey"], description: "A team explores space to save humanity", poster: "🚀", mood: "inspiring" },
    { id: 8, title: "Parasite", genres: ["Thriller", "Drama"], rating: 8.5, year: 2019, director: "Bong Joon-ho", actors: ["Song Kang-ho"], description: "A poor family schemes to become employees of a wealthy family", poster: "🏠", mood: "intense" },
    { id: 9, title: "Gladiator", genres: ["Action", "Drama"], rating: 8.5, year: 2000, director: "Ridley Scott", actors: ["Russell Crowe"], description: "A betrayed Roman general seeks revenge", poster: "⚔️", mood: "intense" },
    { id: 10, title: "The Godfather", genres: ["Crime", "Drama"], rating: 9.2, year: 1972, director: "Francis Ford Coppola", actors: ["Marlon Brando", "Al Pacino"], description: "The aging patriarch of a crime dynasty transfers control", poster: "👔", mood: "intense" },
    { id: 11, title: "Titanic", genres: ["Romance", "Drama"], rating: 7.9, year: 1997, director: "James Cameron", actors: ["Leonardo DiCaprio", "Kate Winslet"], description: "A love story aboard the ill-fated maiden voyage", poster: "🚢", mood: "heartwarming" },
    { id: 12, title: "Avengers: Endgame", genres: ["Action", "Sci-Fi"], rating: 8.4, year: 2019, director: "Russo Brothers", actors: ["Robert Downey Jr.", "Chris Evans"], description: "Heroes assemble for one final stand against Thanos", poster: "⚡", mood: "exciting" },
    { id: 13, title: "The Grand Budapest Hotel", genres: ["Comedy", "Drama"], rating: 8.1, year: 2014, director: "Wes Anderson", actors: ["Ralph Fiennes"], description: "A concierge and lobby boy's adventures at a famous hotel", poster: "🏨", mood: "whimsical" },
    { id: 14, title: "La La Land", genres: ["Romance", "Musical"], rating: 8.0, year: 2016, director: "Damien Chazelle", actors: ["Ryan Gosling", "Emma Stone"], description: "A jazz pianist and actress fall in love in LA", poster: "🎵", mood: "heartwarming" },
    { id: 15, title: "Get Out", genres: ["Thriller", "Horror"], rating: 7.7, year: 2017, director: "Jordan Peele", actors: ["Daniel Kaluuya"], description: "A young man uncovers disturbing secrets at his girlfriend's family estate", poster: "👁️", mood: "intense" },
    { id: 16, title: "Whiplash", genres: ["Drama", "Music"], rating: 8.5, year: 2014, director: "Damien Chazelle", actors: ["Miles Teller", "J.K. Simmons"], description: "A drummer endures brutal instruction from a ruthless teacher", poster: "🥁", mood: "intense" }
  ];

  const genres = ["Action", "Sci-Fi", "Drama", "Crime", "Thriller", "Romance", "Comedy", "Horror", "Musical"];
  const decades = ["1970s", "1980s", "1990s", "2000s", "2010s", "2020s"];
  const moods = ["Intense", "Heartwarming", "Exciting", "Inspiring", "Whimsical", "Edgy"];

  const handleProfileChange = (field, value) => {
    setUserProfile(prev => ({ ...prev, [field]: value }));
  };

  const toggleGenreInProfile = (genre) => {
    setUserProfile(prev => ({
      ...prev,
      favoriteGenres: prev.favoriteGenres.includes(genre)
        ? prev.favoriteGenres.filter(g => g !== genre)
        : [...prev.favoriteGenres, genre]
    }));
  };

  const completeOnboarding = () => {
    if (userProfile.name && userProfile.favoriteGenres.length > 0) {
      setSelectedGenres(userProfile.favoriteGenres);
      setStep('discover');
    }
  };

  const getRecommendations = () => {
    setLoading(true);
    setTimeout(() => {
      let scored = movieDatabase.map(movie => {
        let score = 0;
        
        const genreMatch = selectedGenres.length === 0 || 
          movie.genres.some(g => selectedGenres.includes(g));
        if (!genreMatch && selectedGenres.length > 0) return { ...movie, score: 0 };
        
        // Profile-based scoring
        movie.genres.filter(g => userProfile.favoriteGenres.includes(g)).forEach(() => score += 30);
        
        if (userProfile.favoriteDirector && 
            movie.director.toLowerCase().includes(userProfile.favoriteDirector.toLowerCase())) {
          score += 50;
        }
        
        if (userProfile.favoriteActor && 
            movie.actors.some(a => a.toLowerCase().includes(userProfile.favoriteActor.toLowerCase()))) {
          score += 40;
        }
        
        if (userProfile.preferredDecade) {
          const movieDecade = Math.floor(movie.year / 10) * 10 + 's';
          if (userProfile.preferredDecade.includes(movieDecade.slice(2))) {
            score += 25;
          }
        }
        
        if (userProfile.moodPreference && 
            movie.mood === userProfile.moodPreference.toLowerCase()) {
          score += 35;
        }
        
        // Favorite show matching (simple keyword matching)
        if (userProfile.favoriteShow) {
          const showKeywords = userProfile.favoriteShow.toLowerCase().split(' ');
          showKeywords.forEach(keyword => {
            if (movie.title.toLowerCase().includes(keyword) ||
                movie.description.toLowerCase().includes(keyword)) {
              score += 20;
            }
          });
        }
        
        score += movie.genres.filter(g => selectedGenres.includes(g)).length * 20;
        
        if (searchQuery) {
          const query = searchQuery.toLowerCase();
          if (movie.title.toLowerCase().includes(query)) score += 50;
          if (movie.director.toLowerCase().includes(query)) score += 30;
          if (movie.description.toLowerCase().includes(query)) score += 20;
        }
        
        score += movie.rating * 5;
        
        const ratedMovies = Object.keys(userRatings);
        if (ratedMovies.length > 0) {
          ratedMovies.forEach(ratedId => {
            const ratedMovie = movieDatabase.find(m => m.id === parseInt(ratedId));
            if (ratedMovie) {
              const commonGenres = movie.genres.filter(g => ratedMovie.genres.includes(g)).length;
              const userRating = userRatings[ratedId];
              score += commonGenres * userRating * 3;
              
              if (ratedMovie.director === movie.director && userRating >= 4) {
                score += 25;
              }
            }
          });
        }
        
        if (userRatings[movie.id]) score -= 100;
        
        return { ...movie, score };
      });

      scored = scored
        .filter(m => m.score > 0)
        .sort((a, b) => b.score - a.score)
        .slice(0, 6);

      setRecommendations(scored);
      setLoading(false);
    }, 500);
  };

  useEffect(() => {
    if (step === 'discover') {
      getRecommendations();
    }
  }, [selectedGenres, searchQuery, userRatings, step]);

  const toggleGenre = (genre) => {
    setSelectedGenres(prev => 
      prev.includes(genre) 
        ? prev.filter(g => g !== genre)
        : [...prev, genre]
    );
  };

  const rateMovie = (movieId, rating) => {
    setUserRatings(prev => ({ ...prev, [movieId]: rating }));
  };

  const getRatedMovies = () => {
    return movieDatabase.filter(m => userRatings[m.id]);
  };

  if (step === 'onboarding') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white flex items-center justify-center p-6">
        <div className="max-w-2xl w-full bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-8 shadow-2xl">
          <div className="text-center mb-8">
            <Film className="w-16 h-16 text-purple-400 mx-auto mb-4" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
              Welcome to Alka Talkies
            </h1>
            <p className="text-gray-300">Let's personalize your movie recommendations</p>
          </div>

          <div className="space-y-6">
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-300 mb-2">
                <User className="w-4 h-4" />
                What's your name?
              </label>
              <input
                type="text"
                value={userProfile.name}
                onChange={(e) => handleProfileChange('name', e.target.value)}
                placeholder="Enter your name"
                className="w-full px-4 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-300 mb-2">
                <Film className="w-4 h-4" />
                What's your favorite TV show or movie?
              </label>
              <input
                type="text"
                value={userProfile.favoriteShow}
                onChange={(e) => handleProfileChange('favoriteShow', e.target.value)}
                placeholder="e.g., Breaking Bad, The Office, Star Wars"
                className="w-full px-4 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-300 mb-2">
                <Heart className="w-4 h-4" />
                Select your favorite genres (choose at least one)
              </label>
              <div className="flex flex-wrap gap-2">
                {genres.map(genre => (
                  <button
                    key={genre}
                    onClick={() => toggleGenreInProfile(genre)}
                    className={`px-4 py-2 rounded-full transition-all duration-300 ${
                      userProfile.favoriteGenres.includes(genre)
                        ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/50'
                        : 'bg-white/10 hover:bg-white/20 border border-white/20'
                    }`}
                  >
                    {genre}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-300 mb-2">
                <Award className="w-4 h-4" />
                Favorite actor or actress? (optional)
              </label>
              <input
                type="text"
                value={userProfile.favoriteActor}
                onChange={(e) => handleProfileChange('favoriteActor', e.target.value)}
                placeholder="e.g., Tom Hanks, Meryl Streep"
                className="w-full px-4 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-300 mb-2">
                <Film className="w-4 h-4" />
                Favorite director? (optional)
              </label>
              <input
                type="text"
                value={userProfile.favoriteDirector}
                onChange={(e) => handleProfileChange('favoriteDirector', e.target.value)}
                placeholder="e.g., Christopher Nolan, Spielberg"
                className="w-full px-4 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-300 mb-2">
                <Calendar className="w-4 h-4" />
                Preferred decade? (optional)
              </label>
              <div className="flex flex-wrap gap-2">
                {decades.map(decade => (
                  <button
                    key={decade}
                    onClick={() => handleProfileChange('preferredDecade', decade)}
                    className={`px-4 py-2 rounded-full transition-all ${
                      userProfile.preferredDecade === decade
                        ? 'bg-purple-600 text-white'
                        : 'bg-white/10 hover:bg-white/20 border border-white/20'
                    }`}
                  >
                    {decade}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-300 mb-2">
                <Sparkles className="w-4 h-4" />
                What mood are you looking for? (optional)
              </label>
              <div className="flex flex-wrap gap-2">
                {moods.map(mood => (
                  <button
                    key={mood}
                    onClick={() => handleProfileChange('moodPreference', mood)}
                    className={`px-4 py-2 rounded-full transition-all ${
                      userProfile.moodPreference === mood
                        ? 'bg-purple-600 text-white'
                        : 'bg-white/10 hover:bg-white/20 border border-white/20'
                    }`}
                  >
                    {mood}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={completeOnboarding}
              disabled={!userProfile.name || userProfile.favoriteGenres.length === 0}
              className="w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl font-semibold text-lg flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-purple-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Get My Recommendations
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      <div className="bg-black/30 backdrop-blur-md border-b border-white/10 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Film className="w-8 h-8 text-purple-400" />
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Alka Talkies
                </h1>
                <p className="text-xs text-gray-400">Welcome, {userProfile.name}!</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setActiveTab('discover')}
                className={`px-4 py-2 rounded-lg transition-all ${
                  activeTab === 'discover'
                    ? 'bg-purple-600 text-white'
                    : 'bg-white/10 hover:bg-white/20'
                }`}
              >
                <Sparkles className="w-4 h-4 inline mr-2" />
                Discover
              </button>
              <button
                onClick={() => setActiveTab('rated')}
                className={`px-4 py-2 rounded-lg transition-all ${
                  activeTab === 'rated'
                    ? 'bg-purple-600 text-white'
                    : 'bg-white/10 hover:bg-white/20'
                }`}
              >
                <Star className="w-4 h-4 inline mr-2" />
                My Ratings ({Object.keys(userRatings).length})
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {activeTab === 'discover' ? (
          <>
            <div className="mb-8 space-y-6">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search movies, directors, keywords..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                />
              </div>

              <div>
                <h3 className="text-sm font-semibold text-gray-300 mb-3 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4" />
                  Refine by Genre
                </h3>
                <div className="flex flex-wrap gap-2">
                  {genres.map(genre => (
                    <button
                      key={genre}
                      onClick={() => toggleGenre(genre)}
                      className={`px-4 py-2 rounded-full transition-all duration-300 ${
                        selectedGenres.includes(genre)
                          ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/50'
                          : 'bg-white/10 hover:bg-white/20 border border-white/20'
                      }`}
                    >
                      {genre}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Sparkles className="w-6 h-6 text-purple-400" />
                Recommended For You
              </h2>
              
              {loading ? (
                <div className="flex justify-center items-center h-64">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {(recommendations.length > 0 ? recommendations : movieDatabase.slice(0, 6)).map(movie => (
                    <div
                      key={movie.id}
                      className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl overflow-hidden hover:scale-105 transition-transform duration-300 hover:shadow-xl hover:shadow-purple-500/20"
                    >
                      <div className="p-6">
                        <div className="flex items-start justify-between mb-3">
                          <div className="text-4xl">{movie.poster}</div>
                          <div className="flex items-center gap-1 bg-yellow-500/20 px-2 py-1 rounded-lg">
                            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                            <span className="text-sm font-semibold">{movie.rating}</span>
                          </div>
                        </div>
                        
                        <h3 className="text-xl font-bold mb-1">{movie.title}</h3>
                        <p className="text-sm text-gray-400 mb-3">{movie.year} · {movie.director}</p>
                        <p className="text-sm text-gray-300 mb-4 line-clamp-2">{movie.description}</p>
                        
                        <div className="flex flex-wrap gap-1 mb-4">
                          {movie.genres.map(genre => (
                            <span
                              key={genre}
                              className="px-2 py-1 bg-purple-500/30 rounded-full text-xs"
                            >
                              {genre}
                            </span>
                          ))}
                        </div>

                        <div className="flex gap-1">
                          {[1, 2, 3, 4, 5].map(rating => (
                            <button
                              key={rating}
                              onClick={() => rateMovie(movie.id, rating)}
                              className="transition-transform hover:scale-110"
                            >
                              <Star
                                className={`w-5 h-5 ${
                                  userRatings[movie.id] >= rating
                                    ? 'text-yellow-400 fill-yellow-400'
                                    : 'text-gray-600'
                                }`}
                              />
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        ) : (
          <div>
            <h2 className="text-2xl font-bold mb-6">Your Rated Movies</h2>
            {getRatedMovies().length === 0 ? (
              <div className="text-center py-16 bg-white/5 rounded-xl border border-white/10">
                <Star className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                <p className="text-gray-400">You haven't rated any movies yet.</p>
                <p className="text-sm text-gray-500 mt-2">Start rating to get personalized recommendations!</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {getRatedMovies().map(movie => (
                  <div
                    key={movie.id}
                    className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="text-4xl">{movie.poster}</div>
                      <div className="flex items-center gap-1 bg-green-500/20 px-2 py-1 rounded-lg">
                        <Star className="w-4 h-4 text-green-400 fill-green-400" />
                        <span className="text-sm font-semibold">Your Rating: {userRatings[movie.id]}</span>
                      </div>
                    </div>
                    <h3 className="text-xl font-bold mb-1">{movie.title}</h3>
                    <p className="text-sm text-gray-400">{movie.year} · {movie.director}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MovieRecommendationSystem;