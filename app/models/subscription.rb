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

end
