from random import getrandbits
from urllib import request
from urllib import error
import json


kitty_pool = [
    {
        "name": "Genesis",
        "bio": ("Greetings, human. I am Genesis. The dogs know me as alpha; the cats know me as omega. "
                "To your kind, I am a riddle wrapped in an enigma, first found by a user in Mystery, Alaska. "
                "I looked into the void and the void looked back. "
                "Then I lost interest. I can’t wait to be your new owner!"),
        "image_url": "https://storage.googleapis.com/ck-kitty-image/0x06012c8cf97bead5deae237070f9587f8e7a266d/1.png",
        "generation": 0
    }, {
        "name": "Geggleto",
        "bio": ("Behold, master, I am Geggleto. The collective wisdom of 999 lives swirls within my white-whiskered head, "
                "so forgive me if sometimes I'm forgetful. "
                "Only the mightiest mages and sauciest sorcerers of the KittyVerse may make use of my cat-aclysmic powers."),
        "image_url": "https://storage.googleapis.com/ck-kitty-image/0x06012c8cf97bead5deae237070f9587f8e7a266d/123.png",
        "generation": 1
    }, {
        "name": "364470",
        "bio": ("Yo! I'm Kitty #364470. "
                "I'm a Ventriloquist by day, and I like talking about how much I lift by night. "
                "My secret indulgence is cereal. Maybe you and I can be partners in crime."),
        "image_url": "https://storage.googleapis.com/ck-kitty-image/0x06012c8cf97bead5deae237070f9587f8e7a266d/364470.png",
        "generation": 1
    }, {
        "name": "364426",
        "bio": ("Ciao! I'm Kitty #364426. I enjoy tricking babies, reciting poetry, and glaring at the neighbour's cat. "
                "I'm convinced that the world is flat. One day I'll prove it. In time you'll learn how purrfect I am."),
        "image_url": "https://storage.googleapis.com/ck-kitty-image/0x06012c8cf97bead5deae237070f9587f8e7a266d/364426.png",
        "generation": 1
    }, {
        "name": "STRAWBERRY BRAINS OF STITCHES",
        "bio": ("Ugh! I'm STRAWBERRY BRAINS OF STITCHES. My friends describe me as gullible and stinky. "
                "Sometimes I daydream of a life full of eating lasagna, lasagna, and swiping right. "
                "We can be friends, but keep the ultra purrsonal stuff to yourself, please."),
        "image_url": "https://storage.googleapis.com/ck-kitty-image/0x06012c8cf97bead5deae237070f9587f8e7a266d/459048.png",
        "generation": 2
    }, {
        "name": "Sailer Kitty",
        "bio": ("Ugh! I'm Sailer Kitty #6308!. I enjoy staying woke, glaring at the neighbour's cat, "
                "and eating until I loathe myself. "
                "It wasn't heavily publicized, but I once had a brief relationship with Hobbes. "
                "I look forward to eating until I loathe myself with you."),
        "image_url": "https://storage.googleapis.com/ck-kitty-image/0x06012c8cf97bead5deae237070f9587f8e7a266d/6308.png",
        "generation": 2
    },
    {
        "name": "459060",
        "bio": ("Aloha! My name's Kitty #459060. I once peed on King Henry VIII's cat. "
                "They had it coming. My secret indulgence is apple pie. I hope we can be vegan friends."),
        "image_url": "https://storage.googleapis.com/ck-kitty-image/0x06012c8cf97bead5deae237070f9587f8e7a266d/459060.png",
        "generation": 2
    }, {
        "name": "PhuZiqaat Baby",
        "bio": ("Hi-ya! I'm 🌏 PhuZiqaat Baby. I'm a professional Ventriloquist and I love steak. "
                "It wasn't heavily publicized, but I once had a brief relationship with Cheshire Cat. "
                "We're so fur-tunate to have found each other!"),
        "image_url": "https://storage.googleapis.com/ck-kitty-image/0x06012c8cf97bead5deae237070f9587f8e7a266d/364470.png",
        "generation": 2
    }, {
        "name": "352157",
        "bio": ("Heyo! I'm Kitty #352157. I'm a Private Dancer  by day, and I like running a podcast by night. "
               "I once dreamed of being a Dispensary Clerk. Now I can be found swiping right all day. I hope we can be pawmates."),
        "image_url": "https://storage.googleapis.com/ck-kitty-image/0x06012c8cf97bead5deae237070f9587f8e7a266d/352157.svg",
        "generation": 2
    }, {
        "name": "There Can Be Only One",
        "bio": ("What's up! I'm There Can Be Only One. I'm a Foreign Film Director by day, "
               "and I like volunteering at the local kitten rescue shelter by night. "
               "I once got in a fight with a platypus, and won. Let's get busy!"),
        "image_url": "https://storage.googleapis.com/ck-kitty-image/0x06012c8cf97bead5deae237070f9587f8e7a266d/464511.svg",
        "generation": 2
    }, {
        "name": "henna persian belleblue gold!",
        "bio": ("Oh hi! I'm henna persian belleblue gold!. My friends describe me as despicable and preposterous. "
                "I would give it all up for a Chanel purse. Our friendship will be despicable, preposterous, and full of ice cream."),
        "image_url": "https://storage.googleapis.com/ck-kitty-image/0x06012c8cf97bead5deae237070f9587f8e7a266d/369710.svg",
        "generation": 2
    }, {
        "name": "Flameboy",
        "bio": ("Uh, hi! I'm Flameboy. All you need to know about me is I hate cereal with a passion. "
                "I'm convinced that that one day cats will rule this planet. One day I'll prove it. "
                "In time you'll learn how purrfect I am."),
        "image_url": "https://storage.googleapis.com/ck-kitty-image/0x06012c8cf97bead5deae237070f9587f8e7a266d/98763.svg",
        "generation": 2
    }, {
        "name": "DARK LOVE",
        "bio": ("Sup playa! I'm DARK LOVE. In high school, I was voted best dresser. "
                "I would give it all up to discover a new island. Don't be scared, breeding comes natural to me."),
        "image_url": "https://storage.googleapis.com/ck-kitty-image/0x06012c8cf97bead5deae237070f9587f8e7a266d/634491.svg",
        "generation": 2
    }
]

used_numbers = set()
used_numbers.add(1)
used_numbers.add(123)
used_numbers.add(364470)
used_numbers.add(364426)
used_numbers.add(459048)
used_numbers.add(6308)
used_numbers.add(459060)
used_numbers.add(458515)
used_numbers.add(352157)
used_numbers.add(464511)
used_numbers.add(369710)
used_numbers.add(98763)
used_numbers.add(634491)


def parse_profile_info():
    kitty_number = getrandbits(16)
    print(kitty_number)
    if kitty_number in used_numbers:
        return parse_profile_info()
    used_numbers.add(kitty_number)

    url = "https://api.cryptokitties.co/kitties/{}".format(kitty_number)
    try:
        with request.urlopen(url) as url:
            data = json.loads(url.read().decode())
            print(type(data))
            print(data)
            if data == 'Not Found':
                parse_profile_info()
    except:
        return parse_profile_info()

    name = str(data["id"]) if data["name"] is None else data["name"]
    bio = str(data["id"]) if data["bio"] is None else data["bio"]
    if data["image_url"] is None:
        return parse_profile_info()
    image_url = data["image_url"]

    return [name, bio, image_url]


def generate_and_add_kitty_profile(generation_number):
    total_profile = 3 ** generation_number
    for x in range(total_profile):
        info = parse_profile_info()
        profile = {
            "name": info.pop(0),
            "bio": info.pop(0),
            "image_url": info.pop(0),
            "generation": generation_number
        }
        kitty_pool.append(profile)

    file_path = '/Users/aj/Desktop/kitties'
    with open(file_path, 'w') as fp:
        json.dump(kitty_pool, fp)


if __name__ == "__main__":
    generate_and_add_kitty_profile(3)
    generate_and_add_kitty_profile(4)
    print(kitty_pool)
