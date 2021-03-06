source 'https://rubygems.org'

git_source(:github) do |repo_name|
  repo_name = "#{repo_name}/#{repo_name}" unless repo_name.include?('/')
  "https://github.com/#{repo_name}.git"
end

# Bundle edge Rails instead: gem 'rails', github: 'rails/rails'
gem 'pg'
gem 'rails', '~> 5.1.4'
# Use Puma as the app server
gem 'puma', '~> 3.7'
# Build JSON APIs with ease. Read more: https://github.com/rails/jbuilder
# gem 'jbuilder', '~> 2.5'
# Use Redis adapter to run Action Cable in production
# gem 'redis', '~> 3.0'
# Use ActiveModel has_secure_password
# gem 'bcrypt', '~> 3.1.7'

# Use Capistrano for deployment
# gem 'capistrano-rails', group: :development

# Use Rack CORS for handling Cross-Origin Resource Sharing (CORS), making cross-origin AJAX possible
# gem 'rack-cors'
gem 'batch-loader'
gem 'graphql', '1.7.9'
gem 'graphql-errors'
gem 'httparty'

# used also on production for seeds
gem 'factory_girl_rails'
gem 'faker'
gem 'rubocop', require: false

group :test do
  gem 'database_cleaner'
  gem 'guard-rspec', require: false
  gem 'pry'
  gem 'rspec-rails'
  gem 'simplecov', require: false
end

group :development, :test do
  # Call 'byebug' anywhere in the code to stop execution and get a debugger console
  gem 'byebug', platforms: %i[mri mingw x64_mingw]
end

group :development do
  gem 'listen', '>= 3.0.5', '< 3.2'
  # Spring speeds up development by keeping your application running in the background. Read more: https://github.com/rails/spring
  gem 'pry-rails'
  gem 'rails-erd', require: false
  gem 'spring'
  gem 'spring-watcher-listen', '~> 2.0.0'
  # graphiql in development https://github.com/rmosolgo/graphiql-rails/issues/13#issuecomment-256256255
  gem 'bullet'
  gem 'coffee-rails'
  gem 'graphiql-rails'
  gem 'sass-rails'
  gem 'uglifier'
end

# Windows does not include zoneinfo files, so bundle the tzinfo-data gem
gem 'tzinfo-data', platforms: %i[mingw mswin x64_mingw jruby]
