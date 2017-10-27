# == Schema Information
#
# Table name: feeds
#
#  id         :integer          not null, primary key
#  title      :string           not null
#  url        :text             not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

require 'feedjira'

class Feed < ApplicationRecord
  validates :title, :url, presence: true
  validates :url, uniqueness: true

  has_many :subscriptions

  has_many :collections,
    through: :subscriptions,
    source: :collection

  attr_reader :parsed_feed

  def parsed_feed
    @parsed_feed || Feedjira::Feed.fetch_and_parse(self.url)
  end

  def entries
    parsed_feed.entries
  end

end
