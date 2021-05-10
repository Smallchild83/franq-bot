const ytdl = require('ytdl-core');
const ytsearch = require('yt-search');

module.exports = {
    name:'play',
    description:'Joins and plays stuff form yt',
    async execute(message, args) {
        const voiceChannel = message.member.voice.channel;

        if (!voiceChannel) return message.channel.send('boi, you aint in a vc!');
        const permissions = voiceChannel.permissionsFor(message.client.user);
        if (!permissions.has(`CONNECT`)) return message.channel.send(`weakling you aint aloud to do this :p`);
        if (!permissions.has(`SPEAK`)) return message.channel.send(`weakling you aint aloud to do this :p`);
        if (!args.length) return message.channel.send(`boi i need the 2nd arg`)
    
        const connection = await voiceChannel.join();

        const videoFinder = async (query) => {
            const videoResult = await ytsearch(query);

            return (videoResult.videos.length > 1) ? videoResult.videos[0] : null;

        }

        const video = await videoFinder(args.join(' '));

        if(video){
            const stream = ytdl(song.url, {
                filter: 'audioonly',
                quality: 'highestaudio',
                dlChunkSize: '0',
                highWaterMark: 1 << 25,
            }).on('error', err => {
                console.log(err);
            });
            connection.play(stream, {seek: 0, volume: 1})
            .on('finish', () =>{
                voiceChannel.leave();
            });

            await message.reply(`:thumbsup::skin-tone-5: yo, im playing ***${video.title}***`)
        } else {
            message.channel.send(`No vid results, sorry :p`)
        }

    }
}