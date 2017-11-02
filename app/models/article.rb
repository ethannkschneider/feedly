# == Schema Information
#
# Table name: articles
#
#  id             :integer          not null, primary key
#  headline       :string           not null
#  author         :string           not null
#  feed_id        :integer          not null
#  date_published :datetime
#  content        :text
#  image_url      :text
#  created_at     :datetime         not null
#  updated_at     :datetime         not null
#  summary        :text
#  url            :text
#

class Article < ApplicationRecord
  validates :headline, :author, :feed, presence: true

  belongs_to :feed
  has_many :collections,
    through: :feed,
    source: :collections

  has_many :reads
  has_many :user_who_have_read,
    through: :reads,
    source: :user

end
