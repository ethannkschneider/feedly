# == Schema Information
#
# Table name: subscriptions
#
#  id            :integer          not null, primary key
#  feed_id       :integer          not null
#  collection_id :integer          not null
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#

class Subscription < ApplicationRecord
  validates :feed, :collection, presence: true
  validates :feed_id, uniqueness: { scope: :collection_id }

  belongs_to :feed
  belongs_to :collection

  def self.find_by_feed_and_collection(feed_id, collection_id)
    Feed.where(feed_id: feed_id, collection_id: collection_id).first
  end
end
