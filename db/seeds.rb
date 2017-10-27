# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
require 'faker'

CATEGORIES = ['News', 'Tech', 'Politics', 'Sports', 'Philosophy']

# User Seeds (Demo user remains the same)
User.destroy_all
demo_user = User.create(email: "readly-demo@demo.com", password: "password", first_name: "Demo", last_name: "last_name")
20.times do
  User.create(
    email: Faker::Internet.unique.email,
    password: "password",
    first_name: Faker::Name.first_name,
    last_name: Faker::Name.last_name
  )
end

# Collection Seeds (Demo user's collections remain the same)
Collection.destroy_all

CATEGORIES.each do |category|
  Collection.create(name: category, user_id: demo_user.id)
end

40.times do
  Collection.create(
    name: Faker::Pokemon.unique.move,
    user_id: User.all.sample.id
  )
end
